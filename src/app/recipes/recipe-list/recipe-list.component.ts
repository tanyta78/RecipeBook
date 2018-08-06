import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
	
	subscription:Subscription;
	recipes: Recipe[];

	constructor(private recipeService: RecipeService,
		private router: Router,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.subscription=this.recipeService.recipesChanged.subscribe(
			(newRecipes: Recipe[])=>{
				this.recipes=newRecipes;
			}
		);
		this.recipes = this.recipeService.getRecipes();
	}

	onNewRecipe() {
		this.router.navigate(['new'],{relativeTo:this.route});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
