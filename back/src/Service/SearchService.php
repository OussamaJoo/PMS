<?php 

namespace App\Service;

use App\Repository\SearchRepository;
use Symfony\Component\HttpFoundation\Request;

class SearchService {

    private $searchRepo;

    public function __construct(SearchRepository $searchRepo)
    {

        $this->searchRepo = $searchRepo;

    }

    public function getSearch(Request $req){
      return  $this->searchRepo->searchHotelsMultiRooms($req);
    }

}