<?php

namespace App\Utility;
use Monolog\Handler\AbstractProcessingHandler;
use Doctrine\ORM\EntityManagerInterface;
use Monolog\LogRecord;
use App\Entity\Log;

class DbHandler extends AbstractProcessingHandler
{

    private $manager;
    public function __construct(EntityManagerInterface $manager)
    {
        parent::__construct();
        $this->manager = $manager;
    }

    protected function write(LogRecord $record): void
    {
        $log = new Log();

        $log->setContext($record['context']);
        $log->setLevel($record['level']);
        $log->setLevelName($record['level_name']);
        $log->setMessage($record['message']);
        $log->setExtra($record['extra']);
        $log->setUser($record['extra']['user']);


        $this->manager->persist($log);
        $this->manager->flush();
    }
}