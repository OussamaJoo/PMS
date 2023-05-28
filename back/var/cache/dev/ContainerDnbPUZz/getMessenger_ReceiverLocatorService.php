<?php

namespace ContainerDnbPUZz;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getMessenger_ReceiverLocatorService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private 'messenger.receiver_locator' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['messenger.receiver_locator'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService, [
            'asyncHigh' => ['privates', 'messenger.transport.asyncHigh', 'getMessenger_Transport_AsyncHighService', true],
            'asyncLow' => ['privates', 'messenger.transport.asyncLow', 'getMessenger_Transport_AsyncLowService', true],
            'messenger.transport.asyncHigh' => ['privates', 'messenger.transport.asyncHigh', 'getMessenger_Transport_AsyncHighService', true],
            'messenger.transport.asyncLow' => ['privates', 'messenger.transport.asyncLow', 'getMessenger_Transport_AsyncLowService', true],
        ], [
            'asyncHigh' => '?',
            'asyncLow' => '?',
            'messenger.transport.asyncHigh' => '?',
            'messenger.transport.asyncLow' => '?',
        ]);
    }
}
