<?php

namespace App\Repository;

use App\Entity\Prix;
use App\Service\PrixService;
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
            $dateDe = new \DateTime($datas['dateDe']);
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




}
