import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService:RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  onSubmit(){
    const newRecipe=new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imageUrl'],
      this.recipeForm.value['ingredients']
    );
  //can use only value because of equal names - use this in additing new recipe

   if(this.editMode){
     this.recipeService.updateRecipe(this.id, newRecipe);
   }else{
     this.recipeService.addRecipe(this.recipeForm.value);
   }

   //to navigate
   this.onCancel();
  }

  onAddIngredient(){
     (<FormArray>this.recipeForm.get('ingredients')).push(
       new FormGroup({
         'name': new FormControl(null,Validators.required),
         'amount': new FormControl(null,[Validators.required,
          Validators.pattern(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/)])
       })
     )
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm(){
    let recipeName='';
    let recipeImageUrl='';
    let recipeDescription = '';
    let recipeIngredients = new FormArray ([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImageUrl=recipe.imageUrl;
      recipeDescription=recipe.description;
      if(recipe['ingredients']){
        for (const ing of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name:new FormControl(ing.name,Validators.required),
              amount:new FormControl(ing.amount,[Validators.required,
              Validators.pattern(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imageUrl': new FormControl(recipeImageUrl,Validators.required),
      'description':new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  

}
