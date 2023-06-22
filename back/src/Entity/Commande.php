<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CommandeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommandeRepository::class)]
#[ApiResource]
class Commande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

   

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updated_at = null;

   

    #[ORM\OneToMany(mappedBy: 'commande', targetEntity: Reservation::class , cascade:['persist'])]
    private Collection $lignesReservations;

    #[ORM\Column(length: 255)]
    private ?string $etat = null;

    #[ORM\Column(length: 255)]
    private ?string $reference = null;

    #[ORM\ManyToOne(inversedBy: 'idCommande')]
    private ?Client $client = null;

    #[ORM\ManyToOne(inversedBy: 'idCommande')]
    private ?Etablissement $etablissement = null;

    

    public function __construct()
    {
        $this->date = new \DateTime();
        $this->updated_at = new \DateTime();
        $this->created_at = new \DateTime();
        $this->date = new \DateTime();
        $this->etat = 'Confirmé';
        $this->lignesReservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

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
     * @return Collection<int, Reservation>
     */
    public function getLignesReservations(): Collection
    {
        return $this->lignesReservations;
    }

    public function addLignesReservation(Reservation $lignesReservation): self
    {
        if (!$this->lignesReservations->contains($lignesReservation)) {
            $this->lignesReservations->add($lignesReservation);
            $lignesReservation->setCommande($this);
        }

        return $this;
    }

    public function removeLignesReservation(Reservation $lignesReservation): self
    {
        if ($this->lignesReservations->removeElement($lignesReservation)) {
            // set the owning side to null (unless already changed)
            if ($lignesReservation->getCommande() === $this) {
                $lignesReservation->setCommande(null);
            }
        }

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

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): self
    {
        $this->reference = $reference;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): self
    {
        $this->client = $client;

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

    

   
}
