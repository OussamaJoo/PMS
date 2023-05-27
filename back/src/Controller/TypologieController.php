<?php

namespace App\Controller;

use App\Service\TypologieService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/api', name: 'api_')]
class TypologieController extends AbstractController
{


    #[Route('/AllTypologies', name: 'app_typos',methods:'GET' )]
    public function getAllTypologies(TypologieService $typoService): Response
    {

        return $this->json($typoService->getAllTypologies());
    
}

    #[Route('/TypologieByID/{id}', name: 'app_etab',methods:'GET' )]
    public function getEtabById(int $id,TypologieService $typologieService): Response
    {

        $typo = $typologieService->getTypologieById($id);
        if ($typo == null) {
            throw $this->createNotFoundException('Typologie not exist');
        }
    
        return $this->json($typo);
    }


   
}
