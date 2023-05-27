<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EtablissementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types; 
use DateTime;

#[ORM\Entity(repositoryClass: EtablissementRepository::class)]
#[ApiResource]
class Etablissement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updated_at = null;

    #[ORM\ManyToOne(inversedBy: 'typeId')]
    private ?TypeEtablissement $typeEtablissement = null;

    #[ORM\OneToMany(mappedBy: 'etablissement', targetEntity: Typologie::class)]
    private Collection $idTypologie;

    #[ORM\OneToMany(mappedBy: 'etablissement', targetEntity: MealPlan::class)]
    private Collection $idMealPlan;

    #[ORM\OneToMany(mappedBy: 'etablissement', targetEntity: Reservation::class)]
    private Collection $idReservation;

    #[ORM\Column(length: 255)]
    private ?string $adresse = null;

    public function __construct()
    {
        $this->updated_at = new \DateTime();
        $this->created_at = new \DateTime();
        $this->idTypologie = new ArrayCollection();
        $this->idMealPlan = new ArrayCollection();
        $this->idReservation = new ArrayCollection();
        
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

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

    public function getTypeEtablissement(): ?TypeEtablissement
    {
        return $this->typeEtablissement;
    }

    public function setTypeEtablissement(?TypeEtablissement $typeEtablissement): self
    {
        $this->typeEtablissement = $typeEtablissement;

        return $this;
    }

    /**
     * @return Collection<int, Typologie>
     */
    public function getIdTypologie(): Collection
    {
        return $this->idTypologie;
    }

    public function addIdTypologie(Typologie $idTypologie): self
    {
        if (!$this->idTypologie->contains($idTypologie)) {
            $this->idTypologie->add($idTypologie);
            $idTypologie->setEtablissement($this);
        }

        return $this;
    }

    public function removeIdTypologie(Typologie $idTypologie): self
    {
        if ($this->idTypologie->removeElement($idTypologie)) {
            // set the owning side to null (unless already changed)
            if ($idTypologie->getEtablissement() === $this) {
                $idTypologie->setEtablissement(null);
            }
        }

        return $this;
    }

    public function NomEntity(){
        return 'Etablissement';
    }

    /**
     * @return Collection<int, MealPlan>
     */
    public function getIdMealPlan(): Collection
    {
        return $this->idMealPlan;
    }

    public function addIdMealPlan(MealPlan $idMealPlan): self
    {
        if (!$this->idMealPlan->contains($idMealPlan)) {
            $this->idMealPlan->add($idMealPlan);
            $idMealPlan->setEtablissement($this);
        }

        return $this;
    }

    public function removeIdMealPlan(MealPlan $idMealPlan): self
    {
        if ($this->idMealPlan->removeElement($idMealPlan)) {
            // set the owning side to null (unless already changed)
            if ($idMealPlan->getEtablissement() === $this) {
                $idMealPlan->setEtablissement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getIdReservation(): Collection
    {
        return $this->idReservation;
    }

    public function addIdReservation(Reservation $idReservation): self
    {
        if (!$this->idReservation->contains($idReservation)) {
            $this->idReservation->add($idReservation);
            $idReservation->setEtablissement($this);
        }

        return $this;
    }

    public function removeIdReservation(Reservation $idReservation): self
    {
        if ($this->idReservation->removeElement($idReservation)) {
            // set the owning side to null (unless already changed)
            if ($idReservation->getEtablissement() === $this) {
                $idReservation->setEtablissement(null);
            }
        }

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }
}
