<?php

namespace App\Service;

use App\Entity\Typologie;
use App\Repository\AvailibilityRepository;
use Symfony\Component\HttpFoundation\Request;
use DateTime;

class AvailibilityService
{
    private $avaiRepo;
    private $etabService;

    public function __construct(AvailibilityRepository $avaiRepo, EtablissementService $etabService)
    {
        $this->avaiRepo = $avaiRepo;
        $this->etabService = $etabService;
    }


    public function getAvailibility(Request $req)
    {

        $typos[] = new Typologie();
        $typos = $this->avaiRepo->Availibility($req);
        $data = [];

        foreach ($typos as $typo) {



            $data[] = [
                "id" => $typo['id'],
                'nom' => $typo['nom'],
                'capacité' => $typo['capacité'],
                'etablissement' => $this->etabService->getEtabById($typo['etablissement_id']),
                'AcceptEnfant' => $typo['accept_enfant'],
                'AcceptBebe' => $typo['accecpt_bebe'],
                'remborsable' => $typo['remborsable'],
                'annulable' => $typo['annulable'],
                'date_dispo' => $typo['date']



            ];
        }

        return $data;


    }

    public function getSearch(Request $req)
    {
        return  $this->avaiRepo->searchHotelsMultiRooms($req);
    }

      public function getDispo(Request $req)
      {
          return  $this->avaiRepo->DisponibiliteResa($req);
      }

      public function getHotels(String $hotel)
      {

          return $this->avaiRepo->getHotels($hotel);

      }

      public function getSumPrix(DateTime $datedebut, DateTime $datefin, int $idTypo)
      {

          return $this->avaiRepo->getSumPrix($datedebut, $datefin, $idTypo);

      }

      public function getAllCombinaisonWithPrice(String $hotel, int $nbrAdultes, int $nbrChambre, int $nbrEnf, int $nbrBebe, DateTime $dateDu, DateTime $dateAu)
      {


          $hotels = $this->avaiRepo->getHotels($hotel);

          $results = [];


          foreach ($hotels as $hotell) {
              $availableRooms = [];


              $rooms =  $this->avaiRepo->getCombainison($hotell->getId(), $nbrAdultes, $nbrChambre, $nbrEnf ? 1 : 0, $nbrBebe ? 1 : 0);


              foreach($rooms as $room) {


                  $somme = $this->getSumPrix($dateDu, $dateAu, $room->getId());




                  $rooms1 = [
                      'room' => $room,
                      'prixTotale' => $somme

                  ];


                  $availableRooms[] = $rooms1;


              }

              if (count($availableRooms) > 0) {
                  // Ajoute les résultats pour chaque hôtel avec les chambres disponibles pour chaque combinaison de chambre
                  $results[] = [
                      'hotel' => $hotell,
                      'availableRooms' => $availableRooms
                  ];
              }
          }

          return $results;




      }

          public function checkAvailibility(DateTime $datedebut, DateTime $datefin, int $idTypo, int $qte)
          {

              return $this->avaiRepo->checkAvailibility($datedebut, $datefin, $idTypo,$qte);

          }



          public function getCombinaisonDisponibleWithPrice(int $idEtablissement, int $nbrAdultes, int $nbrChambre, int $nbrEnf, int $nbrBebe, DateTime $dateDu, DateTime $dateAu)
          {


              $hotel = $this->avaiRepo->getHotel($idEtablissement);


              $results = [];


              $availableRooms = [];

              $rooms =  $this->avaiRepo->getCombainison($hotel->getId(), $nbrAdultes, $nbrChambre, $nbrEnf ? 1 : 0, $nbrBebe ? 1 : 0);



              foreach($rooms as $room) {


                  $somme = $this->avaiRepo->getSumPrix($dateDu, $dateAu, $room->getId());

                  $isAvailaible = $this->avaiRepo->checkAvailibility($dateDu, $dateAu, $room->getId(),$nbrChambre);

                  $qte = $this->avaiRepo->getTotaleTypoDispo($dateDu, $dateAu, $room->getId());


                  if($isAvailaible) {
                    $rooms1 = [
                        'room' => $room,
                        'prixTotale' => $somme,
                        'qte_dispo' => $qte
    
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
