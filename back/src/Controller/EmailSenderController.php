<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Email\ExampleEmail;

#[Route('/api', name: 'api_')]
class EmailSenderController extends AbstractController
{
    #[Route('/email/sender', name: 'app_email_sender', methods:'POST')]
    public function index(Request $req , ExampleEmail $exampleEmail): Response
    {
        $exampleEmail->send($req);

        return new Response("Email sent");

    }
}
