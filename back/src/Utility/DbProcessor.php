<?php

namespace App\Utility;

use Monolog\LogRecord;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Security;


class DbProcessor {

    private $request;
    private $security;

    public function __construct(RequestStack $request, Security $security)
    {
        $this->request = $request->getCurrentRequest();
        $this->security = $security;
      
    }

    public function __invoke(LogRecord $record)
    {

        
        $record['extra']['clientIp'] = $this->request->getClientIp();
        $record['extra']['url'] = $this->request->getBaseUrl();
        $record['extra']['method'] = $this->request->getMethod();
        


        $user = $this->security->getUser();
        $record['extra']['user'] = $user;

        return $record;

    }
}