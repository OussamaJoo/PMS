<?php

namespace ContainerXPDZgNx;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getAvailibilityServiceService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private 'App\Service\AvailibilityService' shared autowired service.
     *
     * @return \App\Service\AvailibilityService
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'src'.\DIRECTORY_SEPARATOR.'Service'.\DIRECTORY_SEPARATOR.'AvailibilityService.php';
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'src'.\DIRECTORY_SEPARATOR.'Repository'.\DIRECTORY_SEPARATOR.'AvailibilityRepository.php';

        $a = ($container->services['doctrine.orm.default_entity_manager'] ?? $container->getDoctrine_Orm_DefaultEntityManagerService());

        if (isset($container->privates['App\\Service\\AvailibilityService'])) {
            return $container->privates['App\\Service\\AvailibilityService'];
        }

        return $container->privates['App\\Service\\AvailibilityService'] = new \App\Service\AvailibilityService(new \App\Repository\AvailibilityRepository($a, ($container->privates['App\\Repository\\PrixRepository'] ?? $container->load('getPrixRepositoryService'))), ($container->privates['App\\Service\\EtablissementService'] ?? $container->load('getEtablissementServiceService')));
    }
}
