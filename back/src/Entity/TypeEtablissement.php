<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\TypeEtablissementRepository;
use Doctrine\DBAL\Types\Types;  
use Doctrine\ORM\Mapping as ORM;



#[ORM\Entity(repositoryClass: TypeEtablissementRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(uriTemplate: '/createTypeEtab'),
        new Get(),
        new Put(),
        new Patch(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['TypeEtablissement:read']],
    denormalizationContext: ['groups' => ['TypeEtablissement:create', 'TypeEtablissement:update']],
)]

#[Put(denormalizationContext: ['groups' => ['put']])]

class TypeEtablissement
{
    #[Groups(['TypeEtablissement:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['TypeEtablissement:read', 'TypeEtablissement:create', 'TypeEtablissement:update'])]
    #[ORM\Column(length: 255,unique: true)]
    private ?string $nom = null;

    #[Groups(['TypeEtablissement:read', 'TypeEtablissement:create', 'TypeEtablissement:update'])]
    #[ORM\Column]
    private ?bool $etat = null;

    #[Groups(['TypeEtablissement:read', 'TypeEtablissement:create' ])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    #[Groups(['TypeEtablissement:read', 'TypeEtablissement:create', 'TypeEtablissement:update'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updated_at = null;

    #[Groups(['TypeEtablissement:read'])]
    #[ORM\OneToMany(mappedBy: 'typeEtablissement', targetEntity: Etablissement::class)]
    private Collection $typeId;

   

    public function __construct()
    {
        $this->updated_at = new \DateTime();
        $this->created_at = new \DateTime();
        $this->typeId = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function isEtat(): ?bool
    {
        return $this->etat;
    }

    public function setEtat(bool $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeInterface $updated_at): self
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    /**
     * @return Collection<int, Etablissement>
     */
    public function getTypeId(): Collection
    {
        return $this->typeId;
    }

    public function addTypeId(Etablissement $typeId): self
    {
        if (!$this->typeId->contains($typeId)) {
            $this->typeId->add($typeId);
            $typeId->setTypeEtablissement($this);
        }

        return $this;
    }

    public function removeTypeId(Etablissement $typeId): self
    {
        if ($this->typeId->removeElement($typeId)) {
            // set the owning side to null (unless already changed)
            if ($typeId->getTypeEtablissement() === $this) {
                $typeId->setTypeEtablissement(null);
            }
        }

        return $this;
    }

    public function NomEntity(){
        return 'TypeEtablissement';
    }

   
}
