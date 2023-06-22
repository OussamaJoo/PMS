<?php

namespace App\Service;

use App\Entity\Disponibilite;
use App\Entity\Typologie;
use App\Repository\DisponibiliteRepository;
use App\Repository\TypologieRepository;
use DateTime;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Messenger\MessageBusInterface;

class DispoService
{
    private $dispoRepo;
    private $typoRepo;
    private $bus;

    public function __construct(DisponibiliteRepository $dispoRepo, TypologieRepository $typoRepo, MessageBusInterface $bus)
    {

        $this->dispoRepo = $dispoRepo;
        $this->typoRepo = $typoRepo;
        $this->bus = $bus;
    }

    public function addDispo(Request $request): void
    {

        $datas = json_decode($request->getContent(), true);
        $dispo = new Disponibilite();
        $dateDe = new \DateTime($datas['dateDe']);
        $dateAu = new \DateTime($datas['dateAu']);

        while ($dateDe -> format('Y-m-d') <= $dateAu -> format('Y-m-d')) {
            $dispo->setDate($dateDe);
            $dispo->setQte($datas['qte']);

            $typo = new Typologie();
            $typo = $this->typoRepo
                ->find($datas['typologie']);


            $dispo->setTypologie($typo);

            $this->bus->dispatch($dispo);

            $dateDe -> modify('+1 day');
        }
    }

    public function editDispo(Request $request, int $id): void
    {

        $datas = json_decode($request->getContent(), true);
        $dispo = new Disponibilite();
        $dateDe = new \DateTime($datas['date']);

        $dispo->setId($id);

        $dispo->setDate($dateDe);
        $dispo->setQte($datas['qte']);

        $typo = new Typologie();
        $typo = $this->typoRepo
            ->find($datas['typologie']);


        $dispo->setTypologie($typo);

        $this->bus->dispatch($dispo);

    }

    public function getAllDispos()
    {

        $dispos[] = new Disponibilite();
        $dispos = $this->dispoRepo -> findAll();
        $data = [];

        foreach ($dispos as $dispo) {
            $typo = new Typologie();
            $typo = $dispo->getTypologie();
            $data1 =  [
                'id' => $typo->getId(),
                'nom' => $typo->getNom(),
                'capacité' => $typo->getCapacite(),
                'etablissement' => $typo->getEtablissement(),
                'acceptBebe' => $typo->isAccecptBebe(),
                'acceptEnfant' => $typo->isAcceptEnfant(),
                'acceptHandicapé' => $typo->isAcceptHandicapé(),
                'annulable' => $typo->isAnnulable(),
                'remboursable' => $typo->isRemborsable(),
            ];

            $data[] = [
                'id' => $dispo->getId(),
                'date' => $dispo->getDate(),
                'qte' => $dispo->getQte(),
                'typologie' => $data1,


            ];
        }
        return $data;
    }

    public function getDispoByID(int $id)
    {
        $dispo = new Disponibilite();
        $dispo = $this->dispoRepo -> find($id);


        if (!$dispo) {

            return null;
        }

        $typo = new Typologie();
        $typo = $dispo->getTypologie();
        $data1 =  [
            'id' => $typo->getId(),
            'nom' => $typo->getNom(),
            'capacité' => $typo->getCapacite(),
            'etablissement' => $typo->getEtablissement(),
            'acceptBebe' => $typo->isAccecptBebe(),
            'acceptEnfant' => $typo->isAcceptEnfant(),
            'acceptHandicapé' => $typo->isAcceptHandicapé(),
            'annulable' => $typo->isAnnulable(),
            'remboursable' => $typo->isRemborsable(),
        ];

        $data =  [
                    'id' => $dispo->getId(),
                    'date' => $dispo->getDate(),
                    'qte' => $dispo->getQte(),
                    'typologie' => $data1,

        ];

        return $data;
    }

    public function moinsQte(int $idTypo , int $qte, DateTime $datedebut, DateTime $datefin){
        $this->dispoRepo->moinsQte($idTypo,$qte,$datedebut,$datefin);
    }

    public function plusQte(int $idTypo , int $qte, DateTime $datedebut, DateTime $datefin){
        $this->dispoRepo->plusQte($idTypo,$qte,$datedebut,$datefin);
    }

    public function getAllDisposByIdEtab(int $id)
    {

        $dispos[] = new Disponibilite();
        $dispos = $this->dispoRepo -> findByIdEatb($id);
        $data = [];
      

        foreach ($dispos as $dispo) {
            $typo = new Typologie();
            $typo = $dispo->getTypologie();
            $data1 =  [
                'id' => $typo->getId(),
                'nom' => $typo->getNom(),
                'capacité' => $typo->getCapacite(),
                'etablissement' => $typo->getEtablissement(),
                'acceptBebe' => $typo->isAccecptBebe(),
                'acceptEnfant' => $typo->isAcceptEnfant(),
                'acceptHandicapé' => $typo->isAcceptHandicapé(),
                'annulable' => $typo->isAnnulable(),
                'remboursable' => $typo->isRemborsable(),
            ];

            $data[] = [
                'id' => $dispo->getId(),
                'date' => $dispo->getDate(),
                'qte' => $dispo->getQte(),
                'typologie' => $data1,


            ];
        }
        return $data;
    }



   

}
