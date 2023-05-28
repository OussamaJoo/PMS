<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/api/createTypeEtab' => [[['_route' => '_api_/createTypeEtab_post', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\TypeEtablissement', '_api_operation_name' => '_api_/createTypeEtab_post'], null, ['POST' => 0], null, false, false, null]],
        '/api/availibility' => [[['_route' => 'api_app_availibility', '_controller' => 'App\\Controller\\AvailibilityController::index'], null, ['GET' => 0], null, false, false, null]],
        '/api/search' => [[['_route' => 'api_app_search', '_controller' => 'App\\Controller\\AvailibilityController::search'], null, ['POST' => 0], null, false, false, null]],
        '/api/dispoResa' => [[['_route' => 'api_app_searchResa', '_controller' => 'App\\Controller\\AvailibilityController::dispoResa'], null, ['POST' => 0], null, false, false, null]],
        '/api/addDispo' => [[['_route' => 'api_app_addDispo', '_controller' => 'App\\Controller\\DispoController::new'], null, ['POST' => 0], null, false, false, null]],
        '/api/AllDispos' => [[['_route' => 'api_app_dispos', '_controller' => 'App\\Controller\\DispoController::getAllTypologies'], null, ['GET' => 0], null, false, false, null]],
        '/api/email/sender' => [[['_route' => 'api_app_email_sender', '_controller' => 'App\\Controller\\EmailSenderController::index'], null, ['POST' => 0], null, false, false, null]],
        '/api/AllEtabs' => [[['_route' => 'api_app_etabs', '_controller' => 'App\\Controller\\EtabController::getAllTypologies'], null, ['GET' => 0], null, false, false, null]],
        '/api/AllMealPlans' => [[['_route' => 'api_app_mealPlan', '_controller' => 'App\\Controller\\MealPlanController::getAllMealPlans'], null, ['GET' => 0], null, false, false, null]],
        '/api/addTarif' => [[['_route' => 'api_app_prix', '_controller' => 'App\\Controller\\PrixController::new'], null, ['POST' => 0], null, false, false, null]],
        '/api/AllTarifs' => [[['_route' => 'api_app_tarifs', '_controller' => 'App\\Controller\\PrixController::getAllTypologies'], null, ['GET' => 0], null, false, false, null]],
        '/api/SumPrix' => [[['_route' => 'api_app_tarifSum', '_controller' => 'App\\Controller\\PrixController::getPrixByIntervalle'], null, ['GET' => 0], null, false, false, null]],
        '/api/getAllReservations' => [[['_route' => 'api_app_reservation', '_controller' => 'App\\Controller\\ReservationController::index'], null, ['GET' => 0], null, false, false, null]],
        '/api/AllTypologies' => [[['_route' => 'api_app_typos', '_controller' => 'App\\Controller\\TypologieController::getAllTypologies'], null, ['GET' => 0], null, false, false, null]],
        '/api/login' => [[['_route' => 'api_login_check'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/api(?'
                    .'|/\\.well\\-known/genid/([^/]++)(*:43)'
                    .'|(?:/(index)(?:\\.([^/]++))?)?(*:78)'
                    .'|/(?'
                        .'|d(?'
                            .'|ocs(?:\\.([^/]++))?(*:111)'
                            .'|isponibilites(?'
                                .'|/([^/\\.]++)(?:\\.([^/]++))?(*:161)'
                                .'|(?:\\.([^/]++))?(?'
                                    .'|(*:187)'
                                .')'
                                .'|/([^/\\.]++)(?:\\.([^/]++))?(?'
                                    .'|(*:225)'
                                .')'
                            .')'
                        .')'
                        .'|contexts/([^.]+)(?:\\.(jsonld))?(*:267)'
                        .'|e(?'
                            .'|tablissements(?'
                                .'|/([^/\\.]++)(?:\\.([^/]++))?(*:321)'
                                .'|(?:\\.([^/]++))?(?'
                                    .'|(*:347)'
                                .')'
                                .'|/([^/\\.]++)(?:\\.([^/]++))?(?'
                                    .'|(*:385)'
                                .')'
                            .')'
                            .'|dit(?'
                                .'|Dispo/([^/]++)(*:415)'
                                .'|Tarif/([^/]++)(*:437)'
                            .')'
                        .')'
                        .'|meal_plans(?'
                            .'|/([^/\\.]++)(?:\\.([^/]++))?(*:486)'
                            .'|(?:\\.([^/]++))?(?'
                                .'|(*:512)'
                            .')'
                            .'|/([^/\\.]++)(?:\\.([^/]++))?(?'
                                .'|(*:550)'
                            .')'
                        .')'
                        .'|occupants(?'
                            .'|/([^/\\.]++)(?:\\.([^/]++))?(*:598)'
                            .'|(?:\\.([^/]++))?(?'
                                .'|(*:624)'
                            .')'
                            .'|/([^/\\.]++)(?:\\.([^/]++))?(?'
                                .'|(*:662)'
                            .')'
                        .')'
                        .'|prixes(?'
                            .'|/([^/\\.]++)(?:\\.([^/]++))?(*:707)'
                            .'|(?:\\.([^/]++))?(?'
                                .'|(*:733)'
                            .')'
                            .'|/([^/\\.]++)(?:\\.([^/]++))?(?'
                                .'|(*:771)'
                            .')'
                        .')'
                        .'|r(?'
                            .'|eservations(?'
                                .'|/([^/\\.]++)(?:\\.([^/]++))?(*:825)'
                                .'|(?:\\.([^/]++))?(?'
                                    .'|(*:851)'
                                .')'
                                .'|/([^/\\.]++)(?:\\.([^/]++))?(?'
                                    .'|(*:889)'
                                .')'
                            .')'
                            .'|oles(?'
                                .'|(?:\\.([^/]++))?(?'
                                    .'|(*:924)'
                                .')'
                                .'|/([^/\\.]++)(?:\\.([^/]++))?(?'
                                    .'|(*:962)'
                                .')'
                            .')'
                        .')'
                        .'|typ(?'
                            .'|e_etablissements(?'
                                .'|(?:\\.([^/]++))?(*:1013)'
                                .'|/([^/\\.]++)(?:\\.([^/]++))?(?'
                                    .'|(*:1051)'
                                .')'
                            .')'
                            .'|ologies(?'
                                .'|/([^/\\.]++)(?:\\.([^/]++))?(*:1098)'
                                .'|(?:\\.([^/]++))?(?'
                                    .'|(*:1125)'
                                .')'
                                .'|/([^/\\.]++)(?:\\.([^/]++))?(?'
                                    .'|(*:1164)'
                                .')'
                            .')'
                        .')'
                        .'|users(?'
                            .'|(?:\\.([^/]++))?(?'
                                .'|(*:1202)'
                            .')'
                            .'|/([^/\\.]++)(?:\\.([^/]++))?(?'
                                .'|(*:1241)'
                            .')'
                        .')'
                        .'|DispoByID/([^/]++)(*:1270)'
                        .'|EtabByID/([^/]++)(*:1296)'
                        .'|Meal(?'
                            .'|ByID/([^/]++)(*:1325)'
                            .'|PlanByIdEtab/([^/]++)(*:1355)'
                        .')'
                        .'|T(?'
                            .'|arifByID/([^/]++)(*:1386)'
                            .'|ypologieByID/([^/]++)(*:1416)'
                        .')'
                        .'|ReservationById(?'
                            .'|/([^/]++)(*:1453)'
                            .'|Etab/([^/]++)(*:1475)'
                        .')'
                    .')'
                .')'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:1515)'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        43 => [[['_route' => 'api_genid', '_controller' => 'api_platform.action.not_exposed', '_api_respond' => 'true'], ['id'], null, null, false, true, null]],
        78 => [[['_route' => 'api_entrypoint', '_controller' => 'api_platform.action.entrypoint', '_format' => '', '_api_respond' => 'true', 'index' => 'index'], ['index', '_format'], null, null, false, true, null]],
        111 => [[['_route' => 'api_doc', '_controller' => 'api_platform.action.documentation', '_format' => '', '_api_respond' => 'true'], ['_format'], null, null, false, true, null]],
        161 => [[['_route' => '_api_/disponibilites/{id}{._format}_get', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Disponibilite', '_api_operation_name' => '_api_/disponibilites/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null]],
        187 => [
            [['_route' => '_api_/disponibilites{._format}_get_collection', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Disponibilite', '_api_operation_name' => '_api_/disponibilites{._format}_get_collection'], ['_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/disponibilites{._format}_post', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Disponibilite', '_api_operation_name' => '_api_/disponibilites{._format}_post'], ['_format'], ['POST' => 0], null, false, true, null],
        ],
        225 => [
            [['_route' => '_api_/disponibilites/{id}{._format}_put', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Disponibilite', '_api_operation_name' => '_api_/disponibilites/{id}{._format}_put'], ['id', '_format'], ['PUT' => 0], null, false, true, null],
            [['_route' => '_api_/disponibilites/{id}{._format}_patch', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Disponibilite', '_api_operation_name' => '_api_/disponibilites/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
            [['_route' => '_api_/disponibilites/{id}{._format}_delete', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Disponibilite', '_api_operation_name' => '_api_/disponibilites/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
        ],
        267 => [[['_route' => 'api_jsonld_context', '_controller' => 'api_platform.jsonld.action.context', '_format' => 'jsonld', '_api_respond' => 'true'], ['shortName', '_format'], null, null, false, true, null]],
        321 => [[['_route' => '_api_/etablissements/{id}{._format}_get', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Etablissement', '_api_operation_name' => '_api_/etablissements/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null]],
        347 => [
            [['_route' => '_api_/etablissements{._format}_get_collection', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Etablissement', '_api_operation_name' => '_api_/etablissements{._format}_get_collection'], ['_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/etablissements{._format}_post', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Etablissement', '_api_operation_name' => '_api_/etablissements{._format}_post'], ['_format'], ['POST' => 0], null, false, true, null],
        ],
        385 => [
            [['_route' => '_api_/etablissements/{id}{._format}_put', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Etablissement', '_api_operation_name' => '_api_/etablissements/{id}{._format}_put'], ['id', '_format'], ['PUT' => 0], null, false, true, null],
            [['_route' => '_api_/etablissements/{id}{._format}_patch', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Etablissement', '_api_operation_name' => '_api_/etablissements/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
            [['_route' => '_api_/etablissements/{id}{._format}_delete', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Etablissement', '_api_operation_name' => '_api_/etablissements/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
        ],
        415 => [[['_route' => 'api_app_test', '_controller' => 'App\\Controller\\DispoController::edit'], ['id'], ['PUT' => 0], null, false, true, null]],
        437 => [[['_route' => 'api_app_editTarif', '_controller' => 'App\\Controller\\PrixController::edit'], ['id'], ['PUT' => 0], null, false, true, null]],
        486 => [[['_route' => '_api_/meal_plans/{id}{._format}_get', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\MealPlan', '_api_operation_name' => '_api_/meal_plans/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null]],
        512 => [
            [['_route' => '_api_/meal_plans{._format}_get_collection', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\MealPlan', '_api_operation_name' => '_api_/meal_plans{._format}_get_collection'], ['_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/meal_plans{._format}_post', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\MealPlan', '_api_operation_name' => '_api_/meal_plans{._format}_post'], ['_format'], ['POST' => 0], null, false, true, null],
        ],
        550 => [
            [['_route' => '_api_/meal_plans/{id}{._format}_put', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\MealPlan', '_api_operation_name' => '_api_/meal_plans/{id}{._format}_put'], ['id', '_format'], ['PUT' => 0], null, false, true, null],
            [['_route' => '_api_/meal_plans/{id}{._format}_patch', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\MealPlan', '_api_operation_name' => '_api_/meal_plans/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
            [['_route' => '_api_/meal_plans/{id}{._format}_delete', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\MealPlan', '_api_operation_name' => '_api_/meal_plans/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
        ],
        598 => [[['_route' => '_api_/occupants/{id}{._format}_get', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Occupant', '_api_operation_name' => '_api_/occupants/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null]],
        624 => [
            [['_route' => '_api_/occupants{._format}_get_collection', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Occupant', '_api_operation_name' => '_api_/occupants{._format}_get_collection'], ['_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/occupants{._format}_post', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Occupant', '_api_operation_name' => '_api_/occupants{._format}_post'], ['_format'], ['POST' => 0], null, false, true, null],
        ],
        662 => [
            [['_route' => '_api_/occupants/{id}{._format}_put', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Occupant', '_api_operation_name' => '_api_/occupants/{id}{._format}_put'], ['id', '_format'], ['PUT' => 0], null, false, true, null],
            [['_route' => '_api_/occupants/{id}{._format}_patch', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Occupant', '_api_operation_name' => '_api_/occupants/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
            [['_route' => '_api_/occupants/{id}{._format}_delete', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Occupant', '_api_operation_name' => '_api_/occupants/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
        ],
        707 => [[['_route' => '_api_/prixes/{id}{._format}_get', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Prix', '_api_operation_name' => '_api_/prixes/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null]],
        733 => [
            [['_route' => '_api_/prixes{._format}_get_collection', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Prix', '_api_operation_name' => '_api_/prixes{._format}_get_collection'], ['_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/prixes{._format}_post', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Prix', '_api_operation_name' => '_api_/prixes{._format}_post'], ['_format'], ['POST' => 0], null, false, true, null],
        ],
        771 => [
            [['_route' => '_api_/prixes/{id}{._format}_put', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Prix', '_api_operation_name' => '_api_/prixes/{id}{._format}_put'], ['id', '_format'], ['PUT' => 0], null, false, true, null],
            [['_route' => '_api_/prixes/{id}{._format}_patch', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Prix', '_api_operation_name' => '_api_/prixes/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
            [['_route' => '_api_/prixes/{id}{._format}_delete', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Prix', '_api_operation_name' => '_api_/prixes/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
        ],
        825 => [[['_route' => '_api_/reservations/{id}{._format}_get', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Reservation', '_api_operation_name' => '_api_/reservations/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null]],
        851 => [
            [['_route' => '_api_/reservations{._format}_get_collection', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Reservation', '_api_operation_name' => '_api_/reservations{._format}_get_collection'], ['_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/reservations{._format}_post', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Reservation', '_api_operation_name' => '_api_/reservations{._format}_post'], ['_format'], ['POST' => 0], null, false, true, null],
        ],
        889 => [
            [['_route' => '_api_/reservations/{id}{._format}_put', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Reservation', '_api_operation_name' => '_api_/reservations/{id}{._format}_put'], ['id', '_format'], ['PUT' => 0], null, false, true, null],
            [['_route' => '_api_/reservations/{id}{._format}_patch', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Reservation', '_api_operation_name' => '_api_/reservations/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
            [['_route' => '_api_/reservations/{id}{._format}_delete', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Reservation', '_api_operation_name' => '_api_/reservations/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
        ],
        924 => [
            [['_route' => '_api_/roles{._format}_get_collection', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Role', '_api_operation_name' => '_api_/roles{._format}_get_collection'], ['_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/roles{._format}_post', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Role', '_api_operation_name' => '_api_/roles{._format}_post'], ['_format'], ['POST' => 0], null, false, true, null],
        ],
        962 => [
            [['_route' => '_api_/roles/{id}{._format}_get', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Role', '_api_operation_name' => '_api_/roles/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/roles/{id}{._format}_put', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Role', '_api_operation_name' => '_api_/roles/{id}{._format}_put'], ['id', '_format'], ['PUT' => 0], null, false, true, null],
            [['_route' => '_api_/roles/{id}{._format}_patch', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Role', '_api_operation_name' => '_api_/roles/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
            [['_route' => '_api_/roles/{id}{._format}_delete', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Role', '_api_operation_name' => '_api_/roles/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
        ],
        1013 => [[['_route' => '_api_/type_etablissements{._format}_get_collection', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\TypeEtablissement', '_api_operation_name' => '_api_/type_etablissements{._format}_get_collection'], ['_format'], ['GET' => 0], null, false, true, null]],
        1051 => [
            [['_route' => '_api_/type_etablissements/{id}{._format}_get', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\TypeEtablissement', '_api_operation_name' => '_api_/type_etablissements/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/type_etablissements/{id}{._format}_patch', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\TypeEtablissement', '_api_operation_name' => '_api_/type_etablissements/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
            [['_route' => '_api_/type_etablissements/{id}{._format}_delete', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\TypeEtablissement', '_api_operation_name' => '_api_/type_etablissements/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
            [['_route' => '_api_/type_etablissements/{id}{._format}_put', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\TypeEtablissement', '_api_operation_name' => '_api_/type_etablissements/{id}{._format}_put'], ['id', '_format'], ['PUT' => 0], null, false, true, null],
        ],
        1098 => [[['_route' => '_api_/typologies/{id}{._format}_get', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Typologie', '_api_operation_name' => '_api_/typologies/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null]],
        1125 => [
            [['_route' => '_api_/typologies{._format}_get_collection', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Typologie', '_api_operation_name' => '_api_/typologies{._format}_get_collection'], ['_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/typologies{._format}_post', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Typologie', '_api_operation_name' => '_api_/typologies{._format}_post'], ['_format'], ['POST' => 0], null, false, true, null],
        ],
        1164 => [
            [['_route' => '_api_/typologies/{id}{._format}_put', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Typologie', '_api_operation_name' => '_api_/typologies/{id}{._format}_put'], ['id', '_format'], ['PUT' => 0], null, false, true, null],
            [['_route' => '_api_/typologies/{id}{._format}_patch', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Typologie', '_api_operation_name' => '_api_/typologies/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
            [['_route' => '_api_/typologies/{id}{._format}_delete', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\Typologie', '_api_operation_name' => '_api_/typologies/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
        ],
        1202 => [
            [['_route' => '_api_/users{._format}_get_collection', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\User', '_api_operation_name' => '_api_/users{._format}_get_collection'], ['_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/users{._format}_post', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\User', '_api_operation_name' => '_api_/users{._format}_post'], ['_format'], ['POST' => 0], null, false, true, null],
        ],
        1241 => [
            [['_route' => '_api_/users/{id}{._format}_get', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\User', '_api_operation_name' => '_api_/users/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/users/{id}{._format}_put', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\User', '_api_operation_name' => '_api_/users/{id}{._format}_put'], ['id', '_format'], ['PUT' => 0], null, false, true, null],
            [['_route' => '_api_/users/{id}{._format}_patch', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\User', '_api_operation_name' => '_api_/users/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
            [['_route' => '_api_/users/{id}{._format}_delete', '_controller' => 'api_platform.action.placeholder', '_format' => null, '_stateless' => null, '_api_resource_class' => 'App\\Entity\\User', '_api_operation_name' => '_api_/users/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
        ],
        1270 => [[['_route' => 'api_app_dispoId', '_controller' => 'App\\Controller\\DispoController::getEtabById'], ['id'], ['GET' => 0], null, false, true, null]],
        1296 => [[['_route' => 'api_app_etabId', '_controller' => 'App\\Controller\\EtabController::getEtabById'], ['id'], ['GET' => 0], null, false, true, null]],
        1325 => [[['_route' => 'api_app_MealId', '_controller' => 'App\\Controller\\MealPlanController::getEtabById'], ['id'], ['GET' => 0], null, false, true, null]],
        1355 => [[['_route' => 'api_app_mealIdEtab', '_controller' => 'App\\Controller\\MealPlanController::getEtabByIdEtab'], ['id'], ['GET' => 0], null, false, true, null]],
        1386 => [[['_route' => 'api_app_tarifId', '_controller' => 'App\\Controller\\PrixController::getEtabById'], ['id'], ['GET' => 0], null, false, true, null]],
        1416 => [[['_route' => 'api_app_etab', '_controller' => 'App\\Controller\\TypologieController::getEtabById'], ['id'], ['GET' => 0], null, false, true, null]],
        1453 => [[['_route' => 'api_app_resId', '_controller' => 'App\\Controller\\ReservationController::getEtabById'], ['id'], ['GET' => 0], null, false, true, null]],
        1475 => [[['_route' => 'api_app_resIdEtab', '_controller' => 'App\\Controller\\ReservationController::getEtabByIdEtab'], ['id'], ['GET' => 0], null, false, true, null]],
        1515 => [
            [['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
