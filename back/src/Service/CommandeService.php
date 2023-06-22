<?php

namespace App\Service;

use App\Entity\Commande;
use App\Entity\Occupant;
use App\Entity\Reservation;
use App\Repository\ClientRepository;
use App\Repository\CommandeRepository;
use App\Repository\DisponibiliteRepository;
use App\Repository\EtablissementRepository;
use App\Repository\MealPlanRepository;
use App\Repository\ReservationRepository;
use App\Repository\TypologieRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CommandeService
{
    private $commandeRepo;
    private $reservationRepo;
    private $typoRepo;
    private $etablissementRepo;
    private $mealRepo ;
    private $dispoRepo;

    private $clientRepo;

    public function __construct(CommandeRepository $commandeRepo, ReservationRepository $reservationRepo, TypologieRepository $typoRepo, EtablissementRepository $etablissementRepo, MealPlanRepository $mealRepo, DisponibiliteRepository $dispoRepo, ClientRepository $clientRepo)
    {

        $this->commandeRepo = $commandeRepo;
        $this->reservationRepo = $reservationRepo;
        $this->typoRepo = $typoRepo;
        $this->etablissementRepo = $etablissementRepo;
        $this->mealRepo = $mealRepo;
        $this->dispoRepo = $dispoRepo;
        $this->clientRepo = $clientRepo;

    }

    public function referenceDemande()
    {
        $ListDemandeAchat = $this->commandeRepo->findAll();

        $date = new \DateTime();


        $lastNumeroDemandeAchat = "";
        if (count($ListDemandeAchat) == 0) {
            $counterDemande = 1;
        } else {
            $lastNumeroDemandeAchat = $ListDemandeAchat[count($ListDemandeAchat) - 1]->getReference();

            $items = explode("/", $lastNumeroDemandeAchat);

            $dateLastFacture = (int)$items[2];
            $dateComparaison = (int)$date->format('m');

            if ($dateLastFacture != $dateComparaison) {
                $counterDemande = 1;
            }

            $lastFourDigits = substr($lastNumeroDemandeAchat, strrpos($lastNumeroDemandeAchat, "/") + 1);
            $counterDemande = (int)$lastFourDigits;
            $counterDemande++;
        }

        // Faites ce que vous souhaitez avec $counterDemande

        $numero = sprintf("%05d", $counterDemande);
        $reference = "CMD/" . $date->format('Y/m') . "/" . $numero;


        return $reference;
    }

    public function addCommande(Request $req)
    {

        $datas = json_decode($req->getContent(), true);

        $commande = new Commande();



        $reservations  = $datas['reservation'];

        foreach($reservations as $resa) {
            $r = new Reservation();
            $dateDu = new \DateTime($resa['dateDebut']);
            $dateAu = new \DateTime($resa['dateFin']);
            $r->setDateDebut($dateDu);
            $r->setDateFin($dateAu);
            $t = $this->typoRepo->find($resa['typologie']);
            $r->setTypologie($t);
            $e = $this->etablissementRepo->find($resa['etablissement']);
            $r->setEtablissement($e);
            $m = $this->mealRepo->find($resa["mealPlan"]);
            $r->setMealPlan($m);
            $r->setQte($resa['qte']);

            $occupants = $resa['occupants'];
            foreach($occupants as $occ) {
                $o =new Occupant();
                $o->setCin($occ['cin']);
                $o->setNom($occ['nom']);
                $o->setPrenom($occ['prenom']);
                $o->setTel($occ['tel']);
                $o->setEmail($occ['email']);
                $naissance = new \DateTime($occ['naissance']);
                $o->setDateNaissance($naissance);
                $r->addIdOccupant($o);
            }


            if($this->dispoRepo->checkAvailibility($resa['typologie'], $resa['qte'], $dateDu, $dateAu)) {
                $this->dispoRepo->moinsQte($resa['typologie'], $resa['qte'], $dateDu, $dateAu);
                $commande->addLignesReservation($r);
            } else {
                throw new NotFoundHttpException('Typologie non disponible');
            }

            $commande->setReference($this->referenceDemande());
            $client = $this->clientRepo->find($datas['clientId']);
            $commande->setClient($client);
            $etablissement = $this->etablissementRepo->find($datas['etablissementId']);
            $commande->setEtablissement($etablissement);




        }

        $this->commandeRepo->save($commande);



    }

    public function getAll()
    {
        $cmds[] = new Commande();
        $cmds = $this->commandeRepo->findAll();

        $data = [];

        foreach ($cmds as $cmd) {


            $reservs = $cmd->getLignesReservations();
            foreach($reservs as $rs) {

                $data1[] = [

                    "id" => $rs->getId(),
                    "dateDebut" => $rs->getDateDebut(),
                    "dateFin"=> $rs->getDateFin(),
                    "typologie"=> $rs->getTypologie(),
                    "mealPlan" => $rs->getMealPlan(),
                    "etablissement"=>$rs->getEtablissement(),
                    "occupants"=>$rs->getIdOccupant()

                ];

            }



            $data[] = [
                'id' => $cmd->getId(),
                'date' => $cmd->getDate(),
                'reservations' => $data1,
                'etat' => $cmd->getEtat()



            ];
        }
        return $data;
    }


    public function getCommandeById(int $id)
    {
        $cmd[] = new Commande();
        $cmd = $this->commandeRepo->find($id);

        $data = [];



        $reservs [] = new Reservation();
        $reservs = $cmd->getLignesReservations();
        foreach($reservs as $rs) {

            $data1[] = [

                "id" => $rs->getId(),
                "dateDebut" => $rs->getDateDebut()->format("Y-m-d"),
                "dateFin"=> $rs->getDateFin()->format("Y-m-d"),
                "typologie"=> $rs->getTypologie(),
                "mealPlan" => $rs->getMealPlan(),
                "etablissement"=>$rs->getEtablissement(),
                "occupants"=>$rs->getIdOccupant(),
                "qte"=>$rs->getQte()

            ];

        }



        $data = [
            'id' => $cmd->getId(),
            'date' => $cmd->getDate(),
            'reservations' => $data1,
            'etat' => $cmd->getEtat()



        ];

        return $data;
    }

    public function AnnulerCommande(int $id)
    {
        $cmd = $this->commandeRepo->find($id);
        $reservs = $cmd->getLignesReservations();
        foreach($reservs as $r) {
            $t = $r->getTypologie();
            $this->dispoRepo->plusQte($t->getId(), $r->getQte(), $r->getDateDebut(), $r->getDateFin());
        }
        $this->commandeRepo->annulerCommande($id);
    }

    public function getCommandeByIdEtab(int $id){
        $cmds[] = new Commande();
        $cmds = $this->commandeRepo->findByIdEatb($id);
        $data = [];



        foreach ($cmds as $cmd) {

            $reservs = $cmd->getLignesReservations();
            foreach($reservs as $rs) {

                $data1[] = [

                    "id" => $rs->getId(),
                    "dateDebut" => $rs->getDateDebut(),
                    "dateFin"=> $rs->getDateFin(),
                    "typologie"=> $rs->getTypologie(),
                    "mealPlan" => $rs->getMealPlan(),
                    "etablissement"=>$rs->getEtablissement(),
                    "occupants"=>$rs->getIdOccupant()

                ];

            }
      


            $data[] = [
                "id" => $cmd->getId(),
                "reference" => $cmd->getReference(),
                "etat" => $cmd->getEtat(),
                "date" => $cmd->getDate(),
                "reservations" => $data1,
                "client" => $cmd->getClient()
                
           

            ];
        }

        return $data;

    }

    public function getCommandeByIdClient(int $id){
        $cmds[] = new Commande();
        $cmds = $this->commandeRepo->findByIdClient($id);
        $data = [];

        foreach ($cmds as $cmd) {

          
            $reservs = $cmd->getLignesReservations();
            foreach($reservs as $rs) {

                $data1[] = [

                    "id" => $rs->getId(),
                    "dateDebut" => $rs->getDateDebut(),
                    "dateFin"=> $rs->getDateFin(),
                    "typologie"=> $rs->getTypologie(),
                    "mealPlan" => $rs->getMealPlan(),
                    "etablissement"=>$rs->getEtablissement(),
                    "occupants"=>$rs->getIdOccupant()

                ];

            }



            $data[] = [
                "id" => $cmd->getId(),
                "reference" => $cmd->getReference(),
                "etat" => $cmd->getEtat(),
                "date" => $cmd->getDate(),
                "reservations" => $data1,
                
               
                
           

            ];
        }

        return $data;

    }

    


}
