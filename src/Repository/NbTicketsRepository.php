<?php

namespace App\Repository;

use App\Entity\NbTickets;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method NbTickets|null find($id, $lockMode = null, $lockVersion = null)
 * @method NbTickets|null findOneBy(array $criteria, array $orderBy = null)
 * @method NbTickets[]    findAll()
 * @method NbTickets[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NbTicketsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NbTickets::class);
    }

    // /**
    //  * @return NbTickets[] Returns an array of NbTickets objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('n.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?NbTickets
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
