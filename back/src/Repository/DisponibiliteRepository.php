<?php

namespace App\Repository;

use App\Entity\Disponibilite;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Disponibilite>
 *
 * @method Disponibilite|null find($id, $lockMode = null, $lockVersion = null)
 * @method Disponibilite|null findOneBy(array $criteria, array $orderBy = null)
 * @method Disponibilite[]    findAll()
 * @method Disponibilite[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DisponibiliteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Disponibilite::class);

    }

    public function save(Disponibilite $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Disponibilite $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function moinsQte(int $idTypo, int $qte , DateTime $datedebut, DateTime $datefin)
    {
        $updateEtat = $this->createQueryBuilder('d')
        ->update(Disponibilite::class, 'd')
        ->set('d.qte', 'd.qte - :qte')
        ->where('d.typologie = :idTypo AND d.date between :datedeb and :datefin')
        ->setParameter('qte', $qte)
        ->setParameter('idTypo', $idTypo)
        ->setParameter('datedeb', $datedebut)
        ->setParameter('datefin', $datefin)
        ->getQuery();

        $updateEtat->execute();
    }

    public function plusQte(int $idTypo, int $qte, DateTime $datedebut, DateTime $datefin)
    {
        $updateEtat = $this->createQueryBuilder('d')
        ->update(Disponibilite::class, 'd')
        ->set('d.qte', 'd.qte + :qte')
        ->where('d.typologie = :idTypo AND d.date between :datedeb and :datefin')
        ->setParameter('qte', $qte)
        ->setParameter('idTypo', $idTypo)
        ->setParameter('datedeb', $datedebut)
        ->setParameter('datefin', $datefin)
        ->getQuery();

        $updateEtat->execute();
    }

    public function checkAvailibility(int $idTypo, int $qte, DateTime $datedebut, DateTime $datefin)
    {

        $result =   $this->createQueryBuilder('d')
              ->andWhere('d.typologie = :param')
              ->andWhere('d.qte >= :qte')
              ->andWhere('d.date between :datedeb and :datefin')
                  ->setParameter('param', $idTypo)
                  ->setParameter('qte', $qte)
                  ->setParameter('datedeb', $datedebut)
                  ->setParameter('datefin', $datefin)
                  ->getQuery()
                  ->getResult();

        $diff = $datedebut->diff($datefin);
        $s =  $diff->format('%a');
        $t = (int)$s;
        

        return(count($result)==$t+1);

    }

    public function findByIdEatb(int $id): array {


        $hotelsQuery = $this->getEntityManager()->createQuery("
        SELECT d
        FROM App\Entity\Etablissement h
        join  App\Entity\Typologie t
        join App\Entity\Disponibilite d
        WHERE h.id = :id AND 
        t.etablissement = h.id AND
        d.typologie = t.id
        

        ")->setParameter('id', $id);
    


        $hotels = $hotelsQuery->getResult();
        return $hotels;

                
    }


    //    /**
    //     * @return Disponibilite[] Returns an array of Disponibilite objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('d')
    //            ->andWhere('d.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('d.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Disponibilite
    //    {
    //        return $this->createQueryBuilder('d')
    //            ->andWhere('d.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
