<?php

namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpFoundation\Response;
use Psr\Log\LoggerInterface;

class RequestListener
{
    private $logger;


    public function __construct(LoggerInterface $dbLogger)
    {
        $this->logger = $dbLogger;
    }
    public function onKernelResponse(ResponseEvent $event1)
    {
        $response = $event1->getResponse()->getStatusCode();

        switch($response) {
            case 200:
                $this->logger->info($event1->getRequest()->getRequestUri());
                break;
            case 300:
                $this->logger->warning($event1->getRequest()->getPathInfo());
                break;
            case 400:
                $this->logger->error($event1->getRequest()->getPathInfo());
                break;
        }
    }
}
