import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/service/home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = "Shorten URL"
    url = '';
    error = false;
    errorMsg = '';
    success = false;
    shortenUrl = '';

    constructor(
        private homeService: HomeService
    ) { }

    ngOnInit() {
    }

    shortUrl() {
        if (!this.url) {
            this.error = true;
            this.errorMsg = "Please enter url"
            return;
        }
        if (!this.isURL(this.url)) {
            this.error = true;
            this.errorMsg = "Please enter valid url"
            return;
        }

        this.error = false;
        this.errorMsg = '';
        this.homeService.generateUrl({ url: this.url }).subscribe((res: any) => {
            if (res && res.statusCode === 200) {
                this.success = true;
                this.shortenUrl = res.url;
            }
        }, (error) => {
            this.error = true;
            this.errorMsg = error.message;
            this.success = false;
            this.shortenUrl = '';
        });
    }

    isURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
}
