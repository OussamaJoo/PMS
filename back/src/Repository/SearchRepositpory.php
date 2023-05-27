<?php 

namespace App\Repository;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class SearchRepository {

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }


    public function searchHotelsMultiRooms(Request $req) {
       
        $datas = json_decode($req->getContent(), true);
        
        // Requête pour récupérer tous les hôtels disponibles dans la ville spécifiée
        $hotelsQuery = $this->entityManager->createQuery("
            SELECT h
            FROM App\Entity\Etablissement h
            WHERE h.adresse = :location
        ")->setParameter('location', $datas['adresse']);
        
        $hotels = $hotelsQuery->getResult();
        $results = array();
        
        // Boucle à travers chaque hôtel pour trouver les chambres disponibles pour chaque combinaison de chambre
        foreach ($hotels as $hotel) {
            $availableRooms = array();
            for ($i = 1; $i <= $datas['nbChambres']; $i++) {
                // Requête pour récupérer les chambres disponibles pour chaque combinaison de chambre
                $roomsQuery = $this->entityManager->createQuery("
                    SELECT r
                    FROM App\Entity\Typologie r
                    WHERE r.etablissement = :hotel
                    AND r.capacity >= :numAdults
                ")->setParameter('hotel', $hotel['id'])
                  ->setParameter('numAdults', $datas['nbAdultes']);
                
                $rooms = $roomsQuery->getResult();
                if (count($rooms) >= $datas['nbChambres'] - $i + 1) {
                    // Ajoute les chambres disponibles pour chaque combinaison de chambre
                    $availableRooms[] = $rooms;
                }
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


}

