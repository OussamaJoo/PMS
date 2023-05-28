<?php

namespace App\Service;

use App\Entity\Etablissement;
use App\Repository\EtablissementRepository;


class EtablissementService

{

    private $etabRepo;

    public function __construct(EtablissementRepository $etabRepo){
        $this->etabRepo = $etabRepo;
    }

    
    public function getAllEtab(){
        $etabs[] = new Etablissement();
        $etabs = $this->etabRepo -> findAll();
        $data = [];
       
        foreach ($etabs as $etab) { 
           

            $data[] = [
                'id' => $etab->getId(),
                'nom' => $etab->getNom(),
                'description' => $etab->getDescription(),
                'typeEtablissement' => $etab->getTypeEtablissement(),

            ];
        }
        return $data;
    }

    public function getEtabById(int $id){

        $etab = new Etablissement();
        $etab = $this->etabRepo -> find($id);
       
        if(!$etab){
            return null;
        }
    
       
    
        $data =  [
                    'id' => $etab->getId(),
                    'nom' => $etab->getNom(),
                    'description' => $etab->getDescription(),
                    'typeEtablissement' => $etab->getTypeEtablissement(),
                    
        ];


         
        return $data;

    }
}