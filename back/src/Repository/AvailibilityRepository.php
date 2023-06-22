<?php

namespace App\Repository;

use App\Entity\Etablissement;
use App\Entity\Prix;
use App\Service\PrixService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\DBAL\Statement\fetchAll;
use Symfony\Component\HttpFoundation\Request;

class AvailibilityRepository
{
    private $entityManager;
    private $prixRepo;

    public function __construct(EntityManagerInterface $entityManager, PrixRepository $prixRepo)
    {
        $this->entityManager = $entityManager;
        $this->prixRepo = $prixRepo;
    }

    public function Availibility(Request $req)
    {
        $datas = json_decode($req->getContent(), true);
        if($datas['nbEnfants']!=0 && $datas['nbBebe']!=0) {


            $sql = 'select * from Typologie t join Disponibilite d where t.id = d.typologie_id and d.qte > 0 and t.accept_enfant = 1 and t.capacité <= :nbAdultes';
            $params = ['nbAdultes' => $datas['nbAdultes']];
            $results = $this->entityManager->getConnection()->executeQuery($sql, $params)->fetchAll();

        } elseif($datas['nbBebe']!=0) {

            $sql = 'select * from Typologie t join Disponibilite d where t.id = d.typologie_id and d.qte > 0 and t.accecpt_bebe = 1 and t.capacité <= :nbAdultes';
            $params = ['nbAdultes' => $datas['nbAdultes']];
            $results = $this->entityManager->getConnection()->executeQuery($sql, $params)->fetchAll();

        } elseif ($datas['nbEnfants']!=0) {
            $sql = 'select * from Typologie t join Disponibilite d where t.id = d.typologie_id and d.qte > 0 and t.accecpt_bebe = 1 and t.accept_enfant = 1 and t.capacité <= :nbAdultes';
            $params = ['nbAdultes' => $datas['nbAdultes']];
            $results = $this->entityManager->getConnection()->executeQuery($sql, $params)->fetchAll();
        } else {
            $sql = 'select * from Typologie t join Disponibilite d where t.id = d.typologie_id and d.qte > 0 and  t.capacité <= :nbAdultes';
            $params = ['nbAdultes' => $datas['nbAdultes']];
            $results = $this->entityManager->getConnection()->executeQuery($sql, $params)->fetchAll();
        }




        return $results;


    }



    public function searchHotelsMultiRooms(Request $req)
    {

        $datas = json_decode($req->getContent(), true);

        // Requête pour récupérer tous les hôtels disponibles dans la ville spécifiée
        $hotelsQuery = $this->entityManager->createQuery("
            SELECT h
            FROM App\Entity\Etablissement h
            WHERE h.adresse = :location OR h.nom = :location
        ")->setParameter('location', $datas['adresse']);

        $hotels = $hotelsQuery->getResult();
        $results = array();

        // Boucle à travers chaque hôtel pour trouver les chambres disponibles pour chaque combinaison de chambre
        foreach ($hotels as $hotel) {
            $availableRooms = array();

            if($datas['nbChambres']==1) {
                $div = floor($datas['nbAdultes']/$datas['nbChambres']);
                $div2 = $datas['nbAdultes'];
            } else {
                $div = floor($datas['nbAdultes']/$datas['nbChambres']-1);
                $div2 = $datas['nbAdultes']-1;
            }

            // Requête pour récupérer les chambres disponibles pour chaque combinaison de chambre

            if($datas['nbEnfants']!=0 && $datas['nbBebes']!=0) {

                $roomsQuery = $this->entityManager->createQuery("
                    SELECT r
                    FROM App\Entity\Typologie r
                    WHERE r.etablissement = :hotel
                    AND r.capacite between :numAdults and :numAdults2
                    AND r.Accept_enfant = 1 AND r.Accecpt_bebe = 1
                ")->setParameter('hotel', $hotel)
                  ->setParameter('numAdults', $div)
                  ->setParameter('numAdults2', $div2);


            } elseif($datas['nbBebes']!=0) {

                $roomsQuery = $this->entityManager->createQuery("
                    SELECT r
                    FROM App\Entity\Typologie r
                    WHERE r.etablissement = :hotel
                    AND r.capacite between :numAdults and :numAdults2
                    AND r.Accecpt_bebe = 1
                ")->setParameter('hotel', $hotel)
                  ->setParameter('numAdults', $div)
                  ->setParameter('numAdults2', $div2);



            } elseif ($datas['nbEnfants']!=0) {

                $roomsQuery = $this->entityManager->createQuery("
                    SELECT r
                    FROM App\Entity\Typologie r
                    WHERE r.etablissement = :hotel
                    AND r.capacite between :numAdults and :numAdults2
                    AND r.Accept_enfant = 1 
                ")->setParameter('hotel', $hotel)
                  ->setParameter('numAdults', $div)
                  ->setParameter('numAdults2', $div2);

            } else {

                $roomsQuery = $this->entityManager->createQuery("
                    SELECT r
                    FROM App\Entity\Typologie r
                    WHERE r.etablissement = :hotel
                    AND r.capacite between :numAdults and :numAdults2
                ")->setParameter('hotel', $hotel)
                  ->setParameter('numAdults', $div)
                  ->setParameter('numAdults2', $div2);

            }





            $rooms = $roomsQuery->getResult();

            // Ajoute les chambres disponibles pour chaque combinaison de chambre


            foreach($rooms as $room) {
                $dateDe = new \DateTime($datas['dateDe']);
                $dateAu = new \DateTime($datas['dateAu']);
                $somme=0;
                while ($dateDe -> format('Y-m-d') < $dateAu -> format('Y-m-d')) {
                    $p = new Prix();
                    $prixQuery = $this->entityManager->createQuery("
                            SELECT p 
                            FROM App\Entity\Prix p
                            WHERE p.datePrix = :val and p.typologie = :val2") ->setParameter('val', $dateDe -> format('Y-m-d'))
                    ->setParameter('val2', $room->getId());
                    $p = $prixQuery->getOneOrNullResult();
                    $somme += $p->getMontant();

                    $dateDe -> modify('+1 day');
                }





                $rooms1 = [
                    'room' => $room,
                    'prixTotale' => $somme

                ];


                $availableRooms[] = $rooms1;


            }



            if (count($availableRooms) > 0) {
                // Ajoute les résultats pour chaque hôtel avec les chambres disponibles pour chaque combinaison de chambre
                $results[] = array(
                    'hotel' => $hotel,
                    'availableRooms' => $availableRooms
                );
            }
        }

        return $results;
    }


    public function DisponibiliteResa(Request $req)
    {

        $datas = json_decode($req->getContent(), true);

        $hotelQuery = $this->entityManager->createQuery("
        SELECT h
        FROM App\Entity\Etablissement h
        WHERE h.id = :id 
    ")->setParameter('id', $datas['id']);

        $hotel = $hotelQuery->getOneOrNullResult();


        $div = floor($datas['nbAdultes']/$datas['nbChambres']-1);
        $div2 = $datas['nbAdultes']-1;

        if($datas['nbChambres']==1) {
            $div = floor($datas['nbAdultes']/$datas['nbChambres']);
            $div2 = $datas['nbAdultes'];
        }

        // Requête pour récupérer les chambres disponibles pour chaque combinaison de chambre

        if($datas['nbEnfants']!=0 && $datas['nbBebes']!=0) {

            $roomsQuery = $this->entityManager->createQuery("
            SELECT r
            FROM App\Entity\Typologie r
            WHERE r.etablissement = :hotel
            AND r.capacite between :numAdults and :numAdults2
            AND r.Accept_enfant = 1 AND r.Accecpt_bebe = 1
        ")->setParameter('hotel', $hotel)
              ->setParameter('numAdults', $div)
              ->setParameter('numAdults2', $div2);


        } elseif($datas['nbBebes']!=0) {

            $roomsQuery = $this->entityManager->createQuery("
            SELECT r
            FROM App\Entity\Typologie r
            WHERE r.etablissement = :hotel
            AND r.capacite between :numAdults and :numAdults2
            AND r.Accecpt_bebe = 1
        ")->setParameter('hotel', $hotel)
              ->setParameter('numAdults', $div)
              ->setParameter('numAdults2', $div2);



        } elseif ($datas['nbEnfants']!=0) {

            $roomsQuery = $this->entityManager->createQuery("
            SELECT r
            FROM App\Entity\Typologie r
            WHERE r.etablissement = :hotel
            AND r.capacite between :numAdults and :numAdults2
            AND r.Accept_enfant = 1 
        ")->setParameter('hotel', $hotel)
              ->setParameter('numAdults', $div)
              ->setParameter('numAdults2', $div2);

        } else {

            $roomsQuery = $this->entityManager->createQuery("
            SELECT r
            FROM App\Entity\Typologie r
            WHERE r.etablissement = :hotel
            AND r.capacite between :numAdults and :numAdults2
        ")->setParameter('hotel', $hotel)
              ->setParameter('numAdults', $div)
              ->setParameter('numAdults2', $div2);

        }

        $rooms = $roomsQuery->getResult();

        // Ajoute les chambres disponibles pour chaque combinaison de chambre


        foreach($rooms as $room) {
            $dateDe = new \DateTime($datas['dateDu']);
            $dateAu = new \DateTime($datas['dateAu']);
            $somme=0;
            $ok = true;
            while ($dateDe -> format('Y-m-d') < $dateAu -> format('Y-m-d') && $ok == true) {

                $dispoQuery = $this->entityManager->createQuery("
                    SELECT d 
                    FROM App\Entity\Disponibilite d
                    WHERE d.date = :val and d.typologie = :val2") ->setParameter('val', $dateDe -> format('Y-m-d'))
                ->setParameter('val2', $room->getId());
                $d = $dispoQuery->getOneOrNullResult();
                if(is_null($d)||$d->getQte()<=0) {
                    $ok = false;
                    break;
                }

                $prixQuery = $this->entityManager->createQuery("
                SELECT p 
                FROM App\Entity\Prix p
                WHERE p.datePrix = :val and p.typologie = :val2") ->setParameter('val', $dateDe -> format('Y-m-d'))
                ->setParameter('val2', $room->getId());
                $p = $prixQuery->getOneOrNullResult();
                $somme += $p->getMontant();



                $dateDe -> modify('+1 day');
            }


            if($ok == true) {
                $rooms1 = [
                    'room' => $room,
                    'prixTotale' => $somme,
                    'qte_dispo' => $d->getQte()

                ];

                $availableRooms[] = $rooms1;
            } else {
                $availableRooms = [];
            }



        }


        if (count($availableRooms) > 0) {
            // Ajoute les résultats pour chaque hôtel avec les chambres disponibles pour chaque combinaison de chambre
            $results[] = array(
                'hotel' => $hotel,
                'availableRooms' => $availableRooms
            );
        } else {
            $results = [];
        }


        return $results;




    }

    public function getHotelsWithCombainaisonPossile(String $hotel, int $nbrAdultes, int $nbrChambres, int $nbEnf, int $nbBebe)
    {
        $div = floor($nbrAdultes/$nbrChambres-1);
        $div2 = $nbrAdultes-1;
        if($nbrChambres==1) {
            $div = floor($nbrAdultes/$nbrChambres);
            $div2 = $nbrAdultes;
        }
        // Requête pour récupérer tous les hôtels disponibles dans la ville spécifiée
        $hotelsQuery = $this->entityManager->createQuery("
         SELECT h,t
         FROM App\Entity\Etablissement h
         join App\Entity\Typologie t
         WHERE h.adresse = :location OR h.nom = :location AND 
         t.etablissement = h.id
         AND t.capacite between :numAdults and :numAdults2
         AND t.Accept_enfant = :nbEnf AND t.Accecpt_bebe = :nbBebe

         ")->setParameter('location', $hotel)
        ->setParameter('numAdults', $div)
        ->setParameter('numAdults2', $div2)
         ->setParameter('nbEnf', $nbEnf)
        ->setParameter('nbBebe', $nbBebe);

        $hotels = $hotelsQuery->getResult();
        return $hotels;

    }











    public function getHotel(int $id)
    {
        $hotelQuery = $this->entityManager->createQuery("
        SELECT h
        FROM App\Entity\Etablissement h
        WHERE h.id = :id 
    ")->setParameter('id', $id);

        $hotel = $hotelQuery->getOneOrNullResult();

        return $hotel;
    }


    public function getHotels(String $hotel)
    {

        // Requête pour récupérer tous les hôtels disponibles dans la ville spécifiée
        $hotelsQuery = $this->entityManager->createQuery("
         SELECT h
         FROM App\Entity\Etablissement h
         WHERE h.adresse = :location OR h.nom = :location
     ")->setParameter('location', $hotel);

        $hotels = $hotelsQuery->getResult();
        return $hotels;

    }



    public function getCombainisonSansEnfAndBebe(int $hotelId, int $nbrAdultes, int $nbrChambres)
    {
        $div = floor($nbrAdultes/$nbrChambres-1);
        $div2 = $nbrAdultes-1;
        if($nbrChambres==1) {
            $div = floor($nbrAdultes/$nbrChambres);
            $div2 = $nbrAdultes;
        }
        $roomsQuery = $this->entityManager->createQuery("
                    SELECT r
                    FROM App\Entity\Typologie r
                    WHERE r.etablissement = :hotel
                    AND r.capacite between :numAdults and :numAdults2
                  
                ")->setParameter('hotel', $hotelId)
                  ->setParameter('numAdults', $div)
                  ->setParameter('numAdults2', $div2);


        return $roomsQuery->getResult();
    }

    public function getCombainison(int $hotelId, int $nbrAdultes, int $nbrChambres, int $nbEnf, int $nbBebe)
    {
        $div = floor($nbrAdultes/$nbrChambres-1);
        $div2 = $nbrAdultes-1;
        if($nbrChambres==1) {
            $div = floor($nbrAdultes/$nbrChambres);
            $div2 = $nbrAdultes;
        }
        $query = ("
        SELECT r
        FROM App\Entity\Typologie r
        WHERE r.etablissement = :hotel
        AND r.capacite between :numAdults and :numAdults2");
        
        if($nbEnf) {
            $query.="
            AND r.Accept_enfant = :nbEnf";
        }
        if($nbBebe) {
            $query.="
            AND r.Accecpt_bebe = :nbBebe";
        }
        $roomsQuery = $this->entityManager->createQuery($query)
                  ->setParameter('hotel', $hotelId)
                  ->setParameter('numAdults', $div)
                  ->setParameter('numAdults2', $div2);
        if($nbEnf) {
            $roomsQuery->setParameter('nbEnf', $nbEnf);
        }
        if($nbBebe) {
            $roomsQuery->setParameter('nbBebe', $nbBebe);
        }
        

        return $roomsQuery->getResult();
    }

    public function getSumPrix(DateTime $datedebut, DateTime $datefin, int $idTypo)
    {

        $prixQuery = $this->entityManager->createQuery("
        SELECT SUM(p.montant) AS total
        FROM App\Entity\Prix p
        WHERE p.datePrix between :datedeb and :datefin AND p.typologie = :val2")
        ->setParameter('val2', $idTypo)
        ->setParameter('datedeb', $datedebut)
        ->setParameter('datefin', $datefin);
        $result =  $prixQuery->getSingleScalarResult();
        return $result;

    }

    public function getTotaleTypoDispo(DateTime $datedebut, DateTime $datefin, int $idTypo)
    {
        $prixQuery = $this->entityManager->createQuery("
        SELECT AVG(d.qte) 
        FROM App\Entity\Disponibilite d
        WHERE d.date between :datedeb and :datefin AND d.typologie = :val2")
        ->setParameter('val2', $idTypo)
        ->setParameter('datedeb', $datedebut)
        ->setParameter('datefin', $datefin);
        
        $result =  $prixQuery->getSingleScalarResult();
        return  floor($result);

    }


    public function checkAvailibility(DateTime $datedebut, DateTime $datefin, int $idTypo,int $qte)
    {

        $dispoQuery = $this->entityManager->createQuery("
        SELECT d
        FROM App\Entity\Disponibilite d
        WHERE d.date between :datedeb and :datefin AND d.typologie = :val2 AND d.qte >= :qte")
        ->setParameter('val2', $idTypo)
        ->setParameter('datedeb', $datedebut)
        ->setParameter('datefin', $datefin)
        ->setParameter('qte', $qte);
        $result =  $dispoQuery->getResult();

        $diff = $datedebut->diff($datefin);
        $s =  $diff->format('%a');
        $t = (int)$s+1;
        
        return (count($result)==$t);


    }




}
