<?php

namespace ContainerXPDZgNx;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getConsole_Command_MessengerDebugService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private 'console.command.messenger_debug' shared service.
     *
     * @return \Symfony\Component\Messenger\Command\DebugCommand
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'vendor'.\DIRECTORY_SEPARATOR.'symfony'.\DIRECTORY_SEPARATOR.'console'.\DIRECTORY_SEPARATOR.'Command'.\DIRECTORY_SEPARATOR.'Command.php';
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'vendor'.\DIRECTORY_SEPARATOR.'symfony'.\DIRECTORY_SEPARATOR.'messenger'.\DIRECTORY_SEPARATOR.'Command'.\DIRECTORY_SEPARATOR.'DebugCommand.php';

        $container->privates['console.command.messenger_debug'] = $instance = new \Symfony\Component\Messenger\Command\DebugCommand(['messenger.bus.default' => ['App\\Entity\\Disponibilite' => [0 => [0 => 'App\\MessageHandler\\DispoHandler', 1 => []]], 'App\\Entity\\Prix' => [0 => [0 => 'App\\MessageHandler\\PrixHandler', 1 => []]], 'Symfony\\Component\\Mailer\\Messenger\\SendEmailMessage' => [0 => [0 => 'mailer.messenger.message_handler', 1 => []]]]]);

        $instance->setName('debug:messenger');
        $instance->setDescription('List messages you can dispatch using the message buses');

        return $instance;
    }
}
