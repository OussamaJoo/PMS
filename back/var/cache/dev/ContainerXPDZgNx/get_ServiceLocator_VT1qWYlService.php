<?php

namespace ContainerXPDZgNx;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_VT1qWYlService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.vT1qWYl' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.vT1qWYl'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService, [
            'dispoService' => ['privates', 'App\\Service\\DispoService', 'getDispoServiceService', true],
        ], [
            'dispoService' => 'App\\Service\\DispoService',
        ]);
    }
}
