<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ReservationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_debut = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_fin = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updated_at = null;

    #[ORM\OneToMany(mappedBy: 'reservation', targetEntity: Occupant::class)]
    private Collection $idOccupant;

    #[ORM\ManyToOne(inversedBy: 'idReservation')]
    private ?Etablissement $etablissement = null;

    #[ORM\ManyToOne(inversedBy: 'idReservation')]
    private ?Typologie $typologie = null;

    #[ORM\ManyToOne(inversedBy: 'idReservation')]
    private ?MealPlan $mealPlan = null;

    #[ORM\Column(length: 255)]
    private ?string $etat = null;

    public function __construct()
    {
        $this->updated_at = new \DateTime();
        $this->created_at = new \DateTime();
        $this->idOccupant = new ArrayCollection();
        
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id) {
        $this->id = $id;
        return $this;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->date_debut;
    }

    public function setDateDebut(\DateTimeInterface $date_debut): self
    {
        $this->date_debut = $date_debut;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->date_fin;
    }

    public function setDateFin(\DateTimeInterface $date_fin): self
    {
        $this->date_fin = $date_fin;

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
     * @return Collection<int, Occupant>
     */
    public function getIdOccupant(): Collection
    {
        return $this->idOccupant;
    }

    public function addIdOccupant(Occupant $idOccupant): self
    {
        if (!$this->idOccupant->contains($idOccupant)) {
            $this->idOccupant->add($idOccupant);
            $idOccupant->setReservation($this);
        }

        return $this;
    }

    public function removeIdOccupant(Occupant $idOccupant): self
    {
        if ($this->idOccupant->removeElement($idOccupant)) {
            // set the owning side to null (unless already changed)
            if ($idOccupant->getReservation() === $this) {
                $idOccupant->setReservation(null);
            }
        }

        return $this;
    }

    public function getEtablissement(): ?Etablissement
    {
        return $this->etablissement;
    }

    public function setEtablissement(?Etablissement $etablissement): self
    {
        $this->etablissement = $etablissement;

        return $this;
    }

    public function getTypologie(): ?Typologie
    {
        return $this->typologie;
    }

    public function setTypologie(?Typologie $typologie): self
    {
        $this->typologie = $typologie;

        return $this;
    }

    public function getMealPlan(): ?MealPlan
    {
        return $this->mealPlan;
    }

    public function setMealPlan(?MealPlan $mealPlan): self
    {
        $this->mealPlan = $mealPlan;

        return $this;
    }

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(string $etat): self
    {
        $this->etat = $etat;

        return $this;
    }
}
