<?php

namespace App\Service;

use App\Entity\Typologie;
use App\Repository\TypologieRepository;

class TypologieService
{
    private $typoRepo;

    public function __construct(TypologieRepository $typoRepo)
    {

        $this->typoRepo = $typoRepo;

    }

    public function getAllTypologies()
    {

        $typos[] = new Typologie();
        $typos = $this->typoRepo -> findAll();
        $data = [];

        foreach ($typos as $typo) {
            $data[] = [
                'id' => $typo->getId(),
                'nom' => $typo->getNom(),
                'capacite' => $typo->getCapacite(),
                'etablissement' => $typo->getEtablissement(),
                'acceptBebe' => $typo->isAccecptBebe(),
                'acceptEnfant' => $typo->isAcceptEnfant(),
                'acceptHandicapé' => $typo->isAcceptHandicapé(),
                'annulable' => $typo->isAnnulable(),
                'remboursable' => $typo->isRemborsable(),


            ];
        }
        return $data;
    }

    public function getTypologieById(int $id){

        $typo = new Typologie();
        $typo = $this->typoRepo -> find($id);
       
 
        if (!$typo) {
 
            return null;
        }
 
        $data =  [
            'id' => $typo->getId(),
            'nom' => $typo->getNom(),
            'capacite' => $typo->getCapacite(),
            'etablissement' => $typo->getEtablissement(),
            'acceptBebe' => $typo->isAccecptBebe(),
            'acceptEnfant' => $typo->isAcceptEnfant(),
            'acceptHandicapé' => $typo->isAcceptHandicapé(),
            'annulable' => $typo->isAnnulable(),
            'remboursable' => $typo->isRemborsable(),
        ];

        return $data;
    }

}
