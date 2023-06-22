import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home'
import Dashboard from './Dashboard'

import Login from './components/authentification/Login';
import Register from './components/authentification/Register';
import Activate from './components/authentification/Activate';
import RequireAuth from './components/authentification/RequireAuth';
import Unauthorized from './components/authentification/Unauthorized';
import DashboardAdministrateur from './components/administration/Users/DashboardAdministrateur';
import AdministrationPage from './components/administration/AdministrationPage';
import FormAddUser from './components/administration/Users/FormAddUser';
import DetailUser from './components/administration/Users/DetailUser';
import ListUser from './components/administration/Users/ListUser';
import ListRoles from './components/administration/Roles/ListRoles';
import DetailRole from './components/administration/Roles/DetailRole';
import FormAddRole from './components/administration/Roles/FormAddRole';



import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PrintPDF from './components/globalComponenet/PrintPDF';
import ComponentToPrint from './components/globalComponenet/ComponentToPrint';
import DetailFacturePDF from './components/globalComponenet/ComponentToPrint';
import PdfViewerTest from './components/globalComponenet/PdfViewerTest';
import TestViewerPdf from './components/globalComponenet/TestViewerPdf';

import EtablissementPage from './components/etablissement/EtablissementPage';

import ListType from './components/etablissement/type/ListType';
import FormAddType from './components/etablissement/type/FormAddType';
import DetailType from './components/etablissement/type/DetailType';

import ListEtab from './components/etablissement/etablissement/ListEtab';
import FormAddEtab from './components/etablissement/etablissement/FormAddEtab';
import DetailEtab from './components/etablissement/etablissement/DetailEtab';

import ListTypologie from './components/etablissement/typologie/ListTypologie';
import FormAddTypologie from './components/etablissement/typologie/FormAddTypologie';
import DetailTypologie from './components/etablissement/typologie/DetailTypologie';

import DisponibilitePage from './components/disponibilite/DisponibilitePage';

import ListDisponibilite from './components/disponibilite/disponibilite/ListDisponibilite';
import FormAddDispo from './components/disponibilite/disponibilite/FormAddDispo';
import DetailDispo from './components/disponibilite/disponibilite/DetailDispo';

import ListTarifs from './components/disponibilite/tarif/ListTarifs';
import FormAddTarif from './components/disponibilite/tarif/FormAddTarif'
import DetailTarif from './components/disponibilite/tarif/DetailTarif';

import ListMealPlan from './components/etablissement/mealPlan/ListMealPlan';
import FormAddMeal from './components/etablissement/mealPlan/FormAddMeal';
import DetailMeal from './components/etablissement/mealPlan/DetailMeal';

import ReservationPage from './components/reservation/ReservationPage';

import ListReservation from './components/reservation/reservation/ListReservation';
import FormAddReservation from './components/reservation/reservation/FormAddReservation';
import DetailReservation from './components/reservation/reservation/DetailReservation';
import Search from './components/reservation/reservation/Search';
import NewResa from './components/reservation/reservation/NewResa';
import OccupantForm from './components/reservation/reservation/OccupantForm';
import RoomSelection from './components/reservation/reservation/RoomSelection';
import TestForm from './components/reservation/reservation/TestForm';
import FormAddCommande from './components/reservation/reservation/FormAddCommande';
import ListCommande from './components/reservation/reservation/ListCommande';

import ListClient from './components/etablissement/client/ListClient';
import FormAddClient from './components/etablissement/client/FormAddClient';
import DetailClient from './components/etablissement/client/DetailEtab';

import ClientPage from './components/client/ClientPage';
import ListCommandeClient from './components/client/commande/ListCommandeClient';
import AddCmd from './components/client/commande/addCmd';
import NewResa1 from './components/client/commande/NewResa';
import OccupantForm1 from './components/client/commande/OccupantForm';
import DetailCommande from './components/client/commande/DetailCommande';

import RespPage from './components/responsable/RespPage';
import ListCommandeResp from './components/responsable/commande/ListCommandeResp';
import DetailCommande1 from './components/responsable/commande/DetailCommande';

import ListTypologieResp from './components/responsable/typologie/ListTypologieResp';
import FormAddTypologieResp from './components/responsable/typologie/FormAddTypologieResp';
import DetailTypologieResp from './components/responsable/typologie/DetailTypologieResp';

import ListMealPlanResp from './components/responsable/mealPlan/ListMealPlanResp';
import FormAddMealResp from './components/responsable/mealPlan/FormAddMealResp';
import DetailMealResp from './components/responsable/mealPlan/DetailMealResp';

import ListDisponibiliteResp from './components/responsable/disponibilite/ListDisponibiliteResp';
import FormAddDispoResp from './components/responsable/disponibilite/FormAddDispoResp';
import DetailDispoResp from './components/responsable/disponibilite/DetailDispoResp';

import ListTarifsResp from './components/responsable/tarif/ListTarifsResp';
import FormAddTarifResp from './components/responsable/tarif/FormAddTarifResp';
import DetailTarifResp from './components/responsable/tarif/DetailTarifResp';





function App() {
  return (
    <div className="wrapper">
      <ToastContainer autoClose={5000} />
      <Routes>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/activate/:idUser' element={<Activate />}></Route>


        <Route path='/' element={<Login />}>
          <Route index element={<Dashboard />}></Route>
        </Route>

     

      
        <Route path='/etablissement' element={<EtablissementPage />}>
          <Route index element={<Dashboard />}></Route>

          <Route path='/etablissement/types' element={<ListType />}></Route>
          <Route path='/etablissement/addtype' element={<FormAddType />}></Route>
          <Route path='/etablissement/type/:idType' element={<DetailType />}></Route>

          <Route path='/etablissement/etablissements' element={<ListEtab />}></Route>
          <Route path='/etablissement/addetab' element={<FormAddEtab />}></Route>
          <Route path='/etablissement/etablissement/:idEtab' element={<DetailEtab />}></Route>

          <Route path='/etablissement/typologies' element={<ListTypologie />}></Route>
          <Route path='/etablissement/addetypologie' element={<FormAddTypologie />}></Route>
          <Route path='/etablissement/typologie/:idTypologie' element={<DetailTypologie />}></Route>

          <Route path='/etablissement/mealPlans' element={<ListMealPlan />}></Route>
          <Route path='/etablissement/addmeal' element={<FormAddMeal />}></Route>
          <Route path='/etablissement/mealPlan/:idMeal' element={<DetailMeal />}></Route>

          <Route path='/etablissement/reservations' element={<ListReservation />}></Route>
          <Route path='/etablissement/addReservation' element={<FormAddReservation />}></Route>
          <Route path='/etablissement/reservation/:idCmd' element={<DetailReservation />}></Route>
          <Route path='/etablissement/searchResa' element={<Search />}></Route>

          <Route path='/etablissement/clients' element={<ListClient />}></Route>
          <Route path='/etablissement/addClient' element={<FormAddClient />}></Route>
          <Route path='/etablissement/client/:idClient' element={<DetailClient />}></Route>

     

        </Route>

        <Route path='/reservation' element={<ReservationPage />}>
          <Route index element={<Dashboard />}></Route>

          
          <Route path='/reservation/reservations' element={<ListReservation />}></Route>
          <Route path='/reservation/searchResa' element={<Search />}></Route>
          <Route path='/reservation/newResa/:idEtab' element={<NewResa />}></Route>

          <Route path='/reservation/commande/:idCmd' element={<DetailReservation />}></Route>
         
          <Route path='/reservation/addCmd' element={<FormAddCommande />}></Route>
          <Route path='/reservation/addResa' element={<FormAddReservation />}></Route>
          <Route path='/reservation/test' element={<OccupantForm />}></Route>
          <Route path='/reservation/test2' element={<RoomSelection />}></Route>
          <Route path='/reservation/testForm' element={<TestForm />}></Route>
          <Route path='/reservation/commandes' element={<ListCommande />}></Route>
         
          

        </Route>

        <Route path='/disponibilite' element={<DisponibilitePage />}>
          <Route index element={<Dashboard />}></Route>

          
          <Route path='/disponibilite/disponibilites' element={<ListDisponibilite />}></Route>
          <Route path='/disponibilite/addDispo' element={<FormAddDispo />}></Route>
          <Route path='/disponibilite/dispo/:idDispo' element={<DetailDispo />}></Route>

          <Route path='/disponibilite/tarifs' element={<ListTarifs />}></Route>
          <Route path='/disponibilite/addTarif' element={<FormAddTarif />}></Route>
          <Route path='/disponibilite/tarif/:idTarif' element={<DetailTarif />}></Route>

          

        </Route>

        <Route path='/client' element={<ClientPage />}>
          <Route index element={<Dashboard />}></Route>

          
          <Route path='/client/commandes' element={<ListCommandeClient />}></Route>
          <Route path='/client/addCmd' element={<AddCmd />}></Route>
          <Route path='/client/newResa/:idEtab' element={<NewResa1 />}></Route>
          <Route path='/client/test' element={<OccupantForm1 />}></Route>
          <Route path='/client/commande/:idCmd' element={<DetailCommande />}></Route>
         

          

        </Route>

        <Route path='/responsable' element={<RespPage />}>
          <Route index element={<Dashboard />}></Route>

          
          <Route path='/responsable/commandes' element={<ListCommandeResp />}></Route>
          <Route path='/responsable/commande/:idCmd' element={<DetailCommande1 />}></Route>

          <Route path='/responsable/typologies' element={<ListTypologieResp />}></Route>
          <Route path='/responsable/addTypo' element={<FormAddTypologieResp />}></Route>
          <Route path='/responsable/typologie/:idTypologie' element={<DetailTypologieResp />}></Route>

          <Route path='/responsable/mealPlans' element={<ListMealPlanResp />}></Route>
          <Route path='/responsable/addmeal' element={<FormAddMealResp />}></Route>
          <Route path='/responsable/mealPlan/:idMeal' element={<DetailMealResp />}></Route>

          <Route path='/responsable/disponibilites' element={<ListDisponibiliteResp />}></Route>
          <Route path='/responsable/addDispo' element={<FormAddDispoResp />}></Route>
          <Route path='/responsable/dispo/:idDispo' element={<DetailDispoResp />}></Route>

          <Route path='/responsable/tarifs' element={<ListTarifsResp />}></Route>
          <Route path='/responsable/addTarif' element={<FormAddTarifResp />}></Route>
          <Route path='/responsable/tarif/:idTarif' element={<DetailTarifResp />}></Route>

         

          

        </Route>




        

        <Route path='/administration' element={<AdministrationPage/>}>
            <Route index element={<DashboardAdministrateur/>}></Route>
            <Route path='/administration/adduser' element={<FormAddUser/>}></Route>
            <Route path='/administration/users/:idUser' element={<DetailUser/>}></Route>
            <Route path='/administration/users' element={<ListUser/>}></Route>
            <Route path='/administration/roles' element={<ListRoles/>}></Route>
            <Route path='/administration/roles/:idRole' element={<DetailRole/>}></Route>
            <Route path='/administration/addrole' element={<FormAddRole/>}></Route>
        </Route>
        <Route path='/unauthorized' element={<Unauthorized/>}></Route>
        <Route path='/pdf' element={<PrintPDF/>}></Route>
        <Route path='/pdf2' element={<ComponentToPrint/>}></Route>
        <Route path='/facturation/fournisseur/pdf/:idFacture' element={<DetailFacturePDF />}></Route>
        <Route path='/pdfviewer' element={<PdfViewerTest />}></Route>
        <Route path='/testpdf' element={<TestViewerPdf />}></Route>
       
        


      </Routes>
    </div>
  );
}

export default App;
