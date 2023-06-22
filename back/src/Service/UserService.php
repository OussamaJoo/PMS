<?php

namespace App\Service;

use App\Repository\UserRepository;

class UserService
{
    private $userRepo;

    public function __construct(UserRepository $userRepo)
    {

        $this->userRepo = $userRepo;

    }

    public function getMaxId(){
        return $this->userRepo->getMaxId();
    }

}