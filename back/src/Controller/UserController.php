<?php

namespace App\Controller;


use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class UserController extends AbstractController
{
    #[Route('/getMaxId', name: 'app_user',methods : 'GET')]
    public function index(UserService $userService): Response
    {
        return $this->json($userService->getMaxId());
    }
}
