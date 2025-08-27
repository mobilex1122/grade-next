import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreen } from './home-screen/home-screen';
import { AboutScreen } from './about-screen/about-screen';
import { NotFoundScreen } from './not-found-screen/not-found-screen';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { GradeSheet } from './home-screen/grade-sheet/grade-sheet';
import {MatRippleModule} from '@angular/material/core';
import { SubjectView } from './subject-view/subject-view';
import { CreateSubjectButton } from "../components/create-subject-button/create-subject-button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CreateGradeButton } from "../components/create-grade-button/create-subject-button";
import {MatExpansionModule} from '@angular/material/expansion';
import { AddGradeSheet } from './subject-view/add-grade-sheet/add-grade-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AdvancedListItem } from '../components/advanced-list-item/advanced-list-item';
import { SelectGradeSheet } from './subject-view/select-grade-sheet/select-grade-sheet';
import { WelcomeScreen } from './welcome-screen/welcome-screen';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    HomeScreen,
    AboutScreen,
    NotFoundScreen,
    GradeSheet,
    SubjectView,
    AddGradeSheet,
    SelectGradeSheet,
    WelcomeScreen
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    CreateSubjectButton,
    MatToolbarModule,
    CreateGradeButton,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    AdvancedListItem,
    MatStepperModule
]
})
export class ScreensModule { }
