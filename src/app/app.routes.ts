import { Routes } from "@angular/router";
import { HomeScreen } from "./screens/home-screen/home-screen";
import { AboutScreen } from "./screens/about-screen/about-screen";
import { NotFoundScreen } from "./screens/not-found-screen/not-found-screen";
import { SubjectView } from "./screens/subject-view/subject-view";

export const routes: Routes = [
    
    {path:"home", component: HomeScreen},
    {path:"about", component: AboutScreen},
    {path:"", redirectTo: "home", pathMatch: "full"},
    {path:"**", component: NotFoundScreen}
];
