<?php

namespace App\Controller;

use App\Service\CommandeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class CommandeController extends AbstractController
{
    #[Route('/addCommande', name: 'app_addCMD', methods:'POST')]
    public function new(Request $request, CommandeService $commandeService): Response
    {
        $commandeService->addCommande($request);

        return new Response("Commande Ajoutée");

    }

    #[Route('/AllCommandes', name: 'app_cmds', methods:'GET')]
    public function getAllTypologies(CommandeService $cmdService): Response
    {
        return $this->json($cmdService->getAll());
    }

    #[Route('/CmdByID/{id}', name: 'app_cmdId', methods:'GET')]
    public function getEtabById(int $id, CommandeService $cmdService): Response
    {
        $cmd = $cmdService->getCommandeById($id);

        if ($cmd == null) {
            throw $this->createNotFoundException('Commande not exist');
        }

        return $this->json($cmd);
    }

    #[Route('/annulerCmd/{id}', name: 'app_annulerCmd', methods:'PUT')]
    public function edit(int $id, CommandeService $cmdService): Response
    {

        $cmdService->AnnulerCommande($id);
        return new Response("Commande Annulé");
    }

    #[Route('/ref', name: 'app_ref', methods:'GET')]
    public function Ref(CommandeService $cmdService): Response
    {


        return new Response($cmdService->referenceDemande());
    }

    #[Route('/CommandeByIdEtab/{id}', name: 'app_cmdIdEtab', methods:'GET')]
    public function getEtabByIdEtab(int $id, CommandeService $cmdService): Response
    {
        $res = $cmdService->getCommandeByIdEtab($id);


        return $this->json($res);

    }

    #[Route('/CommandeByIdClient/{id}', name: 'app_cmdIdClient', methods:'GET')]
    public function getEtabByIdClient(int $id, CommandeService $cmdService): Response
    {
        $res = $cmdService->getCommandeByIdClient($id);


        return $this->json($res);

    }

}
