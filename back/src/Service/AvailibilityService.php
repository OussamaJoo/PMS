<?php

namespace App\Service;

use App\Entity\Typologie;
use App\Repository\AvailibilityRepository;
use Symfony\Component\HttpFoundation\Request;

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

    public function getSearch(Request $req){
        return  $this->avaiRepo->searchHotelsMultiRooms($req);
      }

      public function getDispo(Request $req){
        return  $this->avaiRepo->DisponibiliteResa($req);
      }

}
