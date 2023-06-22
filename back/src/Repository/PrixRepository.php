<?php

namespace App\Repository;

use App\Entity\Prix;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Prix>
 *
 * @method Prix|null find($id, $lockMode = null, $lockVersion = null)
 * @method Prix|null findOneBy(array $criteria, array $orderBy = null)
 * @method Prix[]    findAll()
 * @method Prix[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PrixRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Prix::class);
    }

    public function save(Prix $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Prix $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return Prix[] Returns an array of Prix objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult() 
//        ;
//    }

   public function findOneByDatePrix($value,$value2): ?Prix
    {
       return $this->createQueryBuilder('p')
           ->andWhere('p.datePrix = :val')
           ->andWhere('p.typologie = :val2')
            ->setParameter('val', $value)
            ->setParameter('val2',$value2)
           ->getQuery()
            ->getOneOrNullResult()
       ;
    }


    public function findByIdEatb(int $id): array {
        $hotelsQuery = $this->getEntityManager()->createQuery("
        SELECT p
        FROM App\Entity\Etablissement h
        join  App\Entity\Typologie t
        join App\Entity\Prix p
        WHERE h.id = :id AND 
        t.etablissement = h.id AND
        p.typologie = t.id
        

        ")->setParameter('id', $id);
    


        $hotels = $hotelsQuery->getResult();
        return $hotels;

    }
}
