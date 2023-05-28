<?php

namespace ContainerDnbPUZz;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getApiPlatform_Doctrine_Orm_QueryExtension_EagerLoadingService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private 'api_platform.doctrine.orm.query_extension.eager_loading' shared service.
     *
     * @return \ApiPlatform\Doctrine\Orm\Extension\EagerLoadingExtension
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'vendor'.\DIRECTORY_SEPARATOR.'api-platform'.\DIRECTORY_SEPARATOR.'core'.\DIRECTORY_SEPARATOR.'src'.\DIRECTORY_SEPARATOR.'Doctrine'.\DIRECTORY_SEPARATOR.'Orm'.\DIRECTORY_SEPARATOR.'Extension'.\DIRECTORY_SEPARATOR.'QueryCollectionExtensionInterface.php';
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'vendor'.\DIRECTORY_SEPARATOR.'api-platform'.\DIRECTORY_SEPARATOR.'core'.\DIRECTORY_SEPARATOR.'src'.\DIRECTORY_SEPARATOR.'Doctrine'.\DIRECTORY_SEPARATOR.'Orm'.\DIRECTORY_SEPARATOR.'Extension'.\DIRECTORY_SEPARATOR.'QueryItemExtensionInterface.php';
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'vendor'.\DIRECTORY_SEPARATOR.'api-platform'.\DIRECTORY_SEPARATOR.'core'.\DIRECTORY_SEPARATOR.'src'.\DIRECTORY_SEPARATOR.'Doctrine'.\DIRECTORY_SEPARATOR.'Orm'.\DIRECTORY_SEPARATOR.'Extension'.\DIRECTORY_SEPARATOR.'EagerLoadingExtension.php';

        $a = ($container->privates['api_platform.metadata.property.metadata_factory.cached'] ?? $container->getApiPlatform_Metadata_Property_MetadataFactory_CachedService());

        if (isset($container->privates['api_platform.doctrine.orm.query_extension.eager_loading'])) {
            return $container->privates['api_platform.doctrine.orm.query_extension.eager_loading'];
        }

        return $container->privates['api_platform.doctrine.orm.query_extension.eager_loading'] = new \ApiPlatform\Doctrine\Orm\Extension\EagerLoadingExtension(($container->privates['api_platform.metadata.property.name_collection_factory.cached'] ?? $container->getApiPlatform_Metadata_Property_NameCollectionFactory_CachedService()), $a, 30, true, false, ($container->privates['api_platform.serializer.mapping.class_metadata_factory'] ?? $container->getApiPlatform_Serializer_Mapping_ClassMetadataFactoryService()));
    }
}
