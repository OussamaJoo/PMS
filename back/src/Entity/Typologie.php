<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TypologieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use DateTime;

#[ORM\Entity(repositoryClass: TypologieRepository::class)]
#[ApiResource]
class Typologie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

  

    #[ORM\Column]
    private ?int $capacite = null;

    #[ORM\Column]
    private ?bool $Accept_enfant = null;

    #[ORM\Column]
    private ?bool $Accecpt_bebe = null;

    #[ORM\Column]
    private ?bool $Accept_handicapé = null;

    #[ORM\Column]
    private ?bool $annulable = null;

    #[ORM\Column]
    private ?bool $remborsable = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updated_at = null;

    #[ORM\OneToMany(mappedBy: 'typologie', targetEntity: Disponibilite::class  )]
    private Collection $idDisponibilite;

    #[ORM\OneToMany(mappedBy: 'typologie', targetEntity: Prix::class)]
    private Collection $idPrix;

    #[ORM\ManyToOne(inversedBy: 'idTypologie')]
    private ?Etablissement $etablissement = null;

    #[ORM\OneToMany(mappedBy: 'typologie', targetEntity: Reservation::class)]
    private Collection $idReservation;

    

    public function __construct()
    {
        $this->updated_at = new \DateTime();
        $this->created_at = new \DateTime();
        $this->idDisponibilite = new ArrayCollection();
        $this->idPrix = new ArrayCollection();
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

 

    public function getCapacite(): ?int
    {
        return $this->capacite;
    }

    public function setCapacite(int $capacite): self
    {
        $this->capacite = $capacite;

        return $this;
    }

    public function isAcceptEnfant(): ?bool
    {
        return $this->Accept_enfant;
    }

    public function setAcceptEnfant(bool $Accept_enfant): self
    {
        $this->Accept_enfant = $Accept_enfant;

        return $this;
    }

    public function isAccecptBebe(): ?bool
    {
        return $this->Accecpt_bebe;
    }

    public function setAccecptBebe(bool $Accecpt_bebe): self
    {
        $this->Accecpt_bebe = $Accecpt_bebe;

        return $this;
    }

    public function isAcceptHandicapé(): ?bool
    {
        return $this->Accept_handicapé;
    }

    public function setAcceptHandicapé(bool $Accept_handicapé): self
    {
        $this->Accept_handicapé = $Accept_handicapé;

        return $this;
    }

    public function isAnnulable(): ?bool
    {
        return $this->annulable;
    }

    public function setAnnulable(bool $annulable): self
    {
        $this->annulable = $annulable;

        return $this;
    }

    public function isRemborsable(): ?bool
    {
        return $this->remborsable;
    }

    public function setRemborsable(bool $remborsable): self
    {
        $this->remborsable = $remborsable;

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
     * @return Collection<int, disponibilite>
     */
    public function getIdDisponibilite(): Collection
    {
        return $this->idDisponibilite;
    }

    public function addIdDisponibilite(disponibilite $idDisponibilite): self
    {
        if (!$this->idDisponibilite->contains($idDisponibilite)) {
            $this->idDisponibilite->add($idDisponibilite);
            $idDisponibilite->setTypologie($this);
        }

        return $this;
    }

    public function removeIdDisponibilite(disponibilite $idDisponibilite): self
    {
        if ($this->idDisponibilite->removeElement($idDisponibilite)) {
            // set the owning side to null (unless already changed)
            if ($idDisponibilite->getTypologie() === $this) {
                $idDisponibilite->setTypologie(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Prix>
     */
    public function getIdPrix(): Collection
    {
        return $this->idPrix;
    }

    public function addIdPrix(Prix $idPrix): self
    {
        if (!$this->idPrix->contains($idPrix)) {
            $this->idPrix->add($idPrix);
            $idPrix->setTypologie($this);
        }

        return $this;
    }

    public function removeIdPrix(Prix $idPrix): self
    {
        if ($this->idPrix->removeElement($idPrix)) {
            // set the owning side to null (unless already changed)
            if ($idPrix->getTypologie() === $this) {
                $idPrix->setTypologie(null);
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

    public function NomEntity(){
        return 'Typologie';
    }

    public function __toString(){
        return $this->nom;
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
            $idReservation->setTypologie($this);
        }

        return $this;
    }

    public function removeIdReservation(Reservation $idReservation): self
    {
        if ($this->idReservation->removeElement($idReservation)) {
            // set the owning side to null (unless already changed)
            if ($idReservation->getTypologie() === $this) {
                $idReservation->setTypologie(null);
            }
        }

        return $this;
    }



    
}
