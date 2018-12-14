import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Dialog } from '../../providers/dialog/dialog';
import { DatabaseProvider } from '../../providers/database/database';
import { Category } from '../../interfaces/category';

@IonicPage()
@Component({
  selector: 'page-job-category',
  templateUrl: 'job-category.html',
})
export class JobCategoryPage {
  categories: Category[] = [];

  constructor(private navCtrl: NavController, private dialog: Dialog, private database: DatabaseProvider) { }

  ionViewDidLoad(): void {
    this.dialog.showLoading();
    this.database.getCategories<Category>().subscribe((res) => {
      this.dialog.hideLoading();
      this.categories = res;
    }, (err) => {
      console.log(err);
      this.dialog.presentAlert(err.message);
    })
  }

  onSelectCategory(category: Category): void {
    this.navCtrl.push('JobDatePage', { category: category });
  }

}
