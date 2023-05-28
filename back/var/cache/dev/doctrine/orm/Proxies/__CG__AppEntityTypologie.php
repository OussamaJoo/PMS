<?php

namespace Proxies\__CG__\App\Entity;

/**
 * DO NOT EDIT THIS FILE - IT WAS CREATED BY DOCTRINE'S PROXY GENERATOR
 */
class Typologie extends \App\Entity\Typologie implements \Doctrine\Persistence\Proxy
{
    use \Symfony\Component\VarExporter\LazyGhostTrait {
        initializeLazyObject as __load;
        setLazyObjectAsInitialized as public __setInitialized;
        isLazyObjectInitialized as private;
        createLazyGhost as private;
        resetLazyObject as private;
        __clone as private __doClone;
    }

    private const LAZY_OBJECT_PROPERTY_SCOPES = [
        "\0".parent::class."\0".'Accecpt_bebe' => [parent::class, 'Accecpt_bebe', null],
        "\0".parent::class."\0".'Accept_enfant' => [parent::class, 'Accept_enfant', null],
        "\0".parent::class."\0".'Accept_handicapé' => [parent::class, 'Accept_handicapé', null],
        "\0".parent::class."\0".'annulable' => [parent::class, 'annulable', null],
        "\0".parent::class."\0".'capacite' => [parent::class, 'capacite', null],
        "\0".parent::class."\0".'categorie' => [parent::class, 'categorie', null],
        "\0".parent::class."\0".'created_at' => [parent::class, 'created_at', null],
        "\0".parent::class."\0".'etablissement' => [parent::class, 'etablissement', null],
        "\0".parent::class."\0".'id' => [parent::class, 'id', null],
        "\0".parent::class."\0".'idDisponibilite' => [parent::class, 'idDisponibilite', null],
        "\0".parent::class."\0".'idPrix' => [parent::class, 'idPrix', null],
        "\0".parent::class."\0".'idReservation' => [parent::class, 'idReservation', null],
        "\0".parent::class."\0".'nom' => [parent::class, 'nom', null],
        "\0".parent::class."\0".'remborsable' => [parent::class, 'remborsable', null],
        "\0".parent::class."\0".'updated_at' => [parent::class, 'updated_at', null],
        'Accecpt_bebe' => [parent::class, 'Accecpt_bebe', null],
        'Accept_enfant' => [parent::class, 'Accept_enfant', null],
        'Accept_handicapé' => [parent::class, 'Accept_handicapé', null],
        'annulable' => [parent::class, 'annulable', null],
        'capacite' => [parent::class, 'capacite', null],
        'categorie' => [parent::class, 'categorie', null],
        'created_at' => [parent::class, 'created_at', null],
        'etablissement' => [parent::class, 'etablissement', null],
        'id' => [parent::class, 'id', null],
        'idDisponibilite' => [parent::class, 'idDisponibilite', null],
        'idPrix' => [parent::class, 'idPrix', null],
        'idReservation' => [parent::class, 'idReservation', null],
        'nom' => [parent::class, 'nom', null],
        'remborsable' => [parent::class, 'remborsable', null],
        'updated_at' => [parent::class, 'updated_at', null],
    ];

    /**
     * @internal
     */
    public bool $__isCloning = false;

    public function __construct(?\Closure $initializer = null)
    {
        self::createLazyGhost($initializer, [
            "\0".parent::class."\0".'id' => true,
            '__isCloning' => true,
        ], $this);
    }

    public function __isInitialized(): bool
    {
        return isset($this->lazyObjectState) && $this->isLazyObjectInitialized();
    }

    public function __clone()
    {
        $this->__isCloning = true;

        try {
            $this->__doClone();
        } finally {
            $this->__isCloning = false;
        }
    }

    public function __serialize(): array
    {
        $properties = (array) $this;
        unset($properties["\0" . self::class . "\0lazyObjectState"], $properties['__isCloning']);

        return $properties;
    }
}
