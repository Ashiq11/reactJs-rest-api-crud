import React, { Component } from "react";
import { classNames } from 'primereact/utils';
import DataService from "../services/data.service";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import "primereact/resources/primereact.min.css";   //core css
import "primeicons/primeicons.css";  //icons
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
//import { InputNumber } from 'primereact/inputnumber';
import './DataTableDemo.css';
import { FileUpload } from 'primereact/fileupload';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";

export default class UserList extends Component {
    proxyurl = "http://localhost:3000/";
    baseURL = "https://www.bistrainer.com/v1/index.cfm?action=testapi.users";

    emptyUser = {
        id: null,
        name: null,
        username: null,
        role: null,
        email: null,
        phone: null,
        city: null,
        address: null
    };
    constructor(props) {
        super(props);

        this.state = {
            users: [{ "role": "Role 1", "city": "Edmonton", "address": "2221 56 st nw", "phone": "780 307 8549", "username": "tuser1", "id": 1, "email": "email1@test.com", "name": "Test User 1" }, { "role": "Role 2", "city": "Edmonton", "address": "2222 57 st nw", "phone": "780 230 9235", "username": "tuser2", "id": 2.0, "email": "email2@test.com", "name": "Test User 2" }, { "role": "Role 3", "city": "Edmonton", "address": "2223 58 st nw", "phone": "780 562 8941", "username": "tuser3", "id": 3.0, "email": "email3@test.com", "name": "Test User 3" }, { "role": "Role 4", "city": "Edmonton", "address": "2224 59 st nw", "phone": "780 881 7501", "username": "tuser4", "id": 4.0, "email": "email4@test.com", "name": "Test User 4" }, { "role": "Role 5", "city": "Edmonton", "address": "2225 60 st nw", "phone": "780 279 6915", "username": "tuser5", "id": 5.0, "email": "email5@test.com", "name": "Test User 5" }, { "role": "Role 6", "city": "Edmonton", "address": "2226 61 st nw", "phone": "780 524 1400", "username": "tuser6", "id": 6.0, "email": "email6@test.com", "name": "Test User 6" }, { "role": "Role 7", "city": "Edmonton", "address": "2227 62 st nw", "phone": "780 310 2292", "username": "tuser7", "id": 7.0, "email": "email7@test.com", "name": "Test User 7" }, { "role": "Role 8", "city": "Edmonton", "address": "2228 63 st nw", "phone": "780 439 4048", "username": "tuser8", "id": 8.0, "email": "email8@test.com", "name": "Test User 8" }, { "role": "Role 9", "city": "Edmonton", "address": "2229 64 st nw", "phone": "780 521 5566", "username": "tuser9", "id": 9.0, "email": "email9@test.com", "name": "Test User 9" }, { "role": "Role 10", "city": "Edmonton", "address": "2230 65 st nw", "phone": "780 603 2988", "username": "tuser10", "id": 10.0, "email": "email10@test.com", "name": "Test User 10" }, { "role": "Role 11", "city": "Edmonton", "address": "2231 66 st nw", "phone": "780 930 5282", "username": "tuser11", "id": 11.0, "email": "email11@test.com", "name": "Test User 11" }, { "role": "Role 12", "city": "Edmonton", "address": "2232 67 st nw", "phone": "780 206 8749", "username": "tuser12", "id": 12.0, "email": "email12@test.com", "name": "Test User 12" }, { "role": "Role 13", "city": "Edmonton", "address": "2233 68 st nw", "phone": "780 309 8860", "username": "tuser13", "id": 13.0, "email": "email13@test.com", "name": "Test User 13" }, { "role": "Role 14", "city": "Edmonton", "address": "2234 69 st nw", "phone": "780 864 5017", "username": "tuser14", "id": 14.0, "email": "email14@test.com", "name": "Test User 14" }, { "role": "Role 15", "city": "Edmonton", "address": "2235 70 st nw", "phone": "780 514 4250", "username": "tuser15", "id": 15.0, "email": "email15@test.com", "name": "Test User 15" }, { "role": "Role 16", "city": "Edmonton", "address": "2236 71 st nw", "phone": "780 974 8012", "username": "tuser16", "id": 16.0, "email": "email16@test.com", "name": "Test User 16" }, { "role": "Role 17", "city": "Edmonton", "address": "2237 72 st nw", "phone": "780 777 6954", "username": "tuser17", "id": 17.0, "email": "email17@test.com", "name": "Test User 17" }, { "role": "Role 18", "city": "Edmonton", "address": "2238 73 st nw", "phone": "780 430 8407", "username": "tuser18", "id": 18.0, "email": "email18@test.com", "name": "Test User 18" }, { "role": "Role 19", "city": "Edmonton", "address": "2239 74 st nw", "phone": "780 751 1583", "username": "tuser19", "id": 19.0, "email": "email19@test.com", "name": "Test User 19" }, { "role": "Role 20", "city": "Edmonton", "address": "2240 75 st nw", "phone": "780 490 5924", "username": "tuser20", "id": 20.0, "email": "email20@test.com", "name": "Test User 20" }, { "role": "Role 21", "city": "Edmonton", "address": "2241 76 st nw", "phone": "780 800 8285", "username": "tuser21", "id": 21.0, "email": "email21@test.com", "name": "Test User 21" }, { "role": "Role 22", "city": "Edmonton", "address": "2242 77 st nw", "phone": "780 939 7553", "username": "tuser22", "id": 22.0, "email": "email22@test.com", "name": "Test User 22" }, { "role": "Role 23", "city": "Edmonton", "address": "2243 78 st nw", "phone": "780 128 1132", "username": "tuser23", "id": 23.0, "email": "email23@test.com", "name": "Test User 23" }, { "role": "Role 24", "city": "Edmonton", "address": "2244 79 st nw", "phone": "780 109 5207", "username": "tuser24", "id": 24.0, "email": "email24@test.com", "name": "Test User 24" }, { "role": "Role 25", "city": "Edmonton", "address": "2245 80 st nw", "phone": "780 933 2746", "username": "tuser25", "id": 25.0, "email": "email25@test.com", "name": "Test User 25" }, { "role": "Role 26", "city": "Edmonton", "address": "2246 81 st nw", "phone": "780 920 1494", "username": "tuser26", "id": 26.0, "email": "email26@test.com", "name": "Test User 26" }, { "role": "Role 27", "city": "Edmonton", "address": "2247 82 st nw", "phone": "780 210 1258", "username": "tuser27", "id": 27.0, "email": "email27@test.com", "name": "Test User 27" }, { "role": "Role 28", "city": "Edmonton", "address": "2248 83 st nw", "phone": "780 800 5221", "username": "tuser28", "id": 28.0, "email": "email28@test.com", "name": "Test User 28" }, { "role": "Role 29", "city": "Edmonton", "address": "2249 84 st nw", "phone": "780 760 9991", "username": "tuser29", "id": 29.0, "email": "email29@test.com", "name": "Test User 29" }, { "role": "Role 30", "city": "Edmonton", "address": "2250 85 st nw", "phone": "780 385 3166", "username": "tuser30", "id": 30.0, "email": "email30@test.com", "name": "Test User 30" }, { "role": "Role 31", "city": "Edmonton", "address": "2251 86 st nw", "phone": "780 592 7070", "username": "tuser31", "id": 31.0, "email": "email31@test.com", "name": "Test User 31" }, { "role": "Role 32", "city": "Edmonton", "address": "2252 87 st nw", "phone": "780 147 6661", "username": "tuser32", "id": 32.0, "email": "email32@test.com", "name": "Test User 32" }, { "role": "Role 33", "city": "Edmonton", "address": "2253 88 st nw", "phone": "780 472 9569", "username": "tuser33", "id": 33.0, "email": "email33@test.com", "name": "Test User 33" }, { "role": "Role 34", "city": "Edmonton", "address": "2254 89 st nw", "phone": "780 412 1510", "username": "tuser34", "id": 34.0, "email": "email34@test.com", "name": "Test User 34" }, { "role": "Role 35", "city": "Edmonton", "address": "2255 90 st nw", "phone": "780 643 3680", "username": "tuser35", "id": 35.0, "email": "email35@test.com", "name": "Test User 35" }, { "role": "Role 36", "city": "Edmonton", "address": "2256 91 st nw", "phone": "780 421 5825", "username": "tuser36", "id": 36.0, "email": "email36@test.com", "name": "Test User 36" }, { "role": "Role 37", "city": "Edmonton", "address": "2257 92 st nw", "phone": "780 607 1814", "username": "tuser37", "id": 37.0, "email": "email37@test.com", "name": "Test User 37" }, { "role": "Role 38", "city": "Edmonton", "address": "2258 93 st nw", "phone": "780 676 4428", "username": "tuser38", "id": 38.0, "email": "email38@test.com", "name": "Test User 38" }, { "role": "Role 39", "city": "Edmonton", "address": "2259 94 st nw", "phone": "780 262 5535", "username": "tuser39", "id": 39.0, "email": "email39@test.com", "name": "Test User 39" }, { "role": "Role 40", "city": "Edmonton", "address": "2260 95 st nw", "phone": "780 216 8570", "username": "tuser40", "id": 40.0, "email": "email40@test.com", "name": "Test User 40" }, { "role": "Role 41", "city": "Edmonton", "address": "2261 96 st nw", "phone": "780 383 9692", "username": "tuser41", "id": 41.0, "email": "email41@test.com", "name": "Test User 41" }, { "role": "Role 42", "city": "Edmonton", "address": "2262 97 st nw", "phone": "780 872 4844", "username": "tuser42", "id": 42.0, "email": "email42@test.com", "name": "Test User 42" }, { "role": "Role 43", "city": "Edmonton", "address": "2263 98 st nw", "phone": "780 248 2144", "username": "tuser43", "id": 43.0, "email": "email43@test.com", "name": "Test User 43" }, { "role": "Role 44", "city": "Edmonton", "address": "2264 99 st nw", "phone": "780 876 6355", "username": "tuser44", "id": 44.0, "email": "email44@test.com", "name": "Test User 44" }, { "role": "Role 45", "city": "Edmonton", "address": "2265 100 st nw", "phone": "780 729 5053", "username": "tuser45", "id": 45.0, "email": "email45@test.com", "name": "Test User 45" }, { "role": "Role 46", "city": "Edmonton", "address": "2266 101 st nw", "phone": "780 439 2375", "username": "tuser46", "id": 46.0, "email": "email46@test.com", "name": "Test User 46" }, { "role": "Role 47", "city": "Edmonton", "address": "2267 102 st nw", "phone": "780 337 9766", "username": "tuser47", "id": 47.0, "email": "email47@test.com", "name": "Test User 47" }, { "role": "Role 48", "city": "Edmonton", "address": "2268 103 st nw", "phone": "780 660 2978", "username": "tuser48", "id": 48.0, "email": "email48@test.com", "name": "Test User 48" }, { "role": "Role 49", "city": "Edmonton", "address": "2269 104 st nw", "phone": "780 298 5963", "username": "tuser49", "id": 49.0, "email": "email49@test.com", "name": "Test User 49" }, { "role": "Role 50", "city": "Edmonton", "address": "2270 105 st nw", "phone": "780 250 8363", "username": "tuser50", "id": 50.0, "email": "email50@test.com", "name": "Test User 50" }, { "role": "Role 51", "city": "Edmonton", "address": "2271 106 st nw", "phone": "780 450 8875", "username": "tuser51", "id": 51.0, "email": "email51@test.com", "name": "Test User 51" }, { "role": "Role 52", "city": "Edmonton", "address": "2272 107 st nw", "phone": "780 211 2905", "username": "tuser52", "id": 52.0, "email": "email52@test.com", "name": "Test User 52" },
            { "role": "Role 53", "city": "Edmonton", "address": "2273 108 st nw", "phone": "780 906 9065", "username": "tuser53", "id": 53.0, "email": "email53@test.com", "name": "Test User 53" }, { "role": "Role 54", "city": "Edmonton", "address": "2274 109 st nw", "phone": "780 264 9275", "username": "tuser54", "id": 54.0, "email": "email54@test.com", "name": "Test User 54" }, { "role": "Role 55", "city": "Edmonton", "address": "2275 110 st nw", "phone": "780 981 8473", "username": "tuser55", "id": 55.0, "email": "email55@test.com", "name": "Test User 55" }, { "role": "Role 56", "city": "Edmonton", "address": "2276 111 st nw", "phone": "780 836 9308", "username": "tuser56", "id": 56.0, "email": "email56@test.com", "name": "Test User 56" }, { "role": "Role 57", "city": "Edmonton", "address": "2277 112 st nw", "phone": "780 329 8173", "username": "tuser57", "id": 57.0, "email": "email57@test.com", "name": "Test User 57" }, { "role": "Role 58", "city": "Edmonton", "address": "2278 113 st nw", "phone": "780 837 9727", "username": "tuser58", "id": 58.0, "email": "email58@test.com", "name": "Test User 58" }, { "role": "Role 59", "city": "Edmonton", "address": "2279 114 st nw", "phone": "780 886 3562", "username": "tuser59", "id": 59.0, "email": "email59@test.com", "name": "Test User 59" }, { "role": "Role 60", "city": "Edmonton", "address": "2280 115 st nw", "phone": "780 708 1190", "username": "tuser60", "id": 60.0, "email": "email60@test.com", "name": "Test User 60" },
            { "role": "Role 61", "city": "Edmonton", "address": "2281 116 st nw", "phone": "780 168 1511", "username": "tuser61", "id": 61.0, "email": "email61@test.com", "name": "Test User 61" }, { "role": "Role 62", "city": "Edmonton", "address": "2282 117 st nw", "phone": "780 330 8623", "username": "tuser62", "id": 62.0, "email": "email62@test.com", "name": "Test User 62" }, { "role": "Role 63", "city": "Edmonton", "address": "2283 118 st nw", "phone": "780 679 8336", "username": "tuser63", "id": 63.0, "email": "email63@test.com", "name": "Test User 63" }, { "role": "Role 64", "city": "Edmonton", "address": "2284 119 st nw", "phone": "780 650 5239", "username": "tuser64", "id": 64.0, "email": "email64@test.com", "name": "Test User 64" }, { "role": "Role 65", "city": "Edmonton", "address": "2285 120 st nw", "phone": "780 851 9322", "username": "tuser65", "id": 65.0, "email": "email65@test.com", "name": "Test User 65" }, { "role": "Role 66", "city": "Edmonton", "address": "2286 121 st nw", "phone": "780 783 7185", "username": "tuser66", "id": 66.0, "email": "email66@test.com", "name": "Test User 66" }, { "role": "Role 67", "city": "Edmonton", "address": "2287 122 st nw", "phone": "780 541 7932", "username": "tuser67", "id": 67.0, "email": "email67@test.com", "name": "Test User 67" }, { "role": "Role 68", "city": "Edmonton", "address": "2288 123 st nw", "phone": "780 759 2275", "username": "tuser68", "id": 68.0, "email": "email68@test.com", "name": "Test User 68" }, { "role": "Role 69", "city": "Edmonton", "address": "2289 124 st nw", "phone": "780 226 8765", "username": "tuser69", "id": 69.0, "email": "email69@test.com", "name": "Test User 69" }, { "role": "Role 70", "city": "Edmonton", "address": "2290 125 st nw", "phone": "780 322 5854", "username": "tuser70", "id": 70.0, "email": "email70@test.com", "name": "Test User 70" }, { "role": "Role 71", "city": "Edmonton", "address": "2291 126 st nw", "phone": "780 179 6776", "username": "tuser71", "id": 71.0, "email": "email71@test.com", "name": "Test User 71" }, { "role": "Role 72", "city": "Edmonton", "address": "2292 127 st nw", "phone": "780 885 4427", "username": "tuser72", "id": 72.0, "email": "email72@test.com", "name": "Test User 72" }, { "role": "Role 73", "city": "Edmonton", "address": "2293 128 st nw", "phone": "780 690 1296", "username": "tuser73", "id": 73.0, "email": "email73@test.com", "name": "Test User 73" }, { "role": "Role 74", "city": "Edmonton", "address": "2294 129 st nw", "phone": "780 726 3337", "username": "tuser74", "id": 74.0, "email": "email74@test.com", "name": "Test User 74" }, { "role": "Role 75", "city": "Edmonton", "address": "2295 130 st nw", "phone": "780 114 2863", "username": "tuser75", "id": 75.0, "email": "email75@test.com", "name": "Test User 75" }, { "role": "Role 76", "city": "Edmonton", "address": "2296 131 st nw", "phone": "780 164 2418", "username": "tuser76", "id": 76.0, "email": "email76@test.com", "name": "Test User 76" }, { "role": "Role 77", "city": "Edmonton", "address": "2297 132 st nw", "phone": "780 326 6987", "username": "tuser77", "id": 77.0, "email": "email77@test.com", "name": "Test User 77" }, { "role": "Role 78", "city": "Edmonton", "address": "2298 133 st nw", "phone": "780 279 4284", "username": "tuser78", "id": 78.0, "email": "email78@test.com", "name": "Test User 78" }, { "role": "Role 79", "city": "Edmonton", "address": "2299 134 st nw", "phone": "780 675 7526", "username": "tuser79", "id": 79.0, "email": "email79@test.com", "name": "Test User 79" }, { "role": "Role 80", "city": "Edmonton", "address": "2300 135 st nw", "phone": "780 978 6582", "username": "tuser80", "id": 80.0, "email": "email80@test.com", "name": "Test User 80" }, { "role": "Role 81", "city": "Edmonton", "address": "2301 136 st nw", "phone": "780 462 7455", "username": "tuser81", "id": 81.0, "email": "email81@test.com", "name": "Test User 81" }, { "role": "Role 82", "city": "Edmonton", "address": "2302 137 st nw", "phone": "780 768 8369", "username": "tuser82", "id": 82.0, "email": "email82@test.com", "name": "Test User 82" }, { "role": "Role 83", "city": "Edmonton", "address": "2303 138 st nw", "phone": "780 631 7519", "username": "tuser83", "id": 83.0, "email": "email83@test.com", "name": "Test User 83" }, { "role": "Role 84", "city": "Edmonton", "address": "2304 139 st nw", "phone": "780 393 2500", "username": "tuser84", "id": 84.0, "email": "email84@test.com", "name": "Test User 84" }, { "role": "Role 85", "city": "Edmonton", "address": "2305 140 st nw", "phone": "780 178 5356", "username": "tuser85", "id": 85.0, "email": "email85@test.com", "name": "Test User 85" }, { "role": "Role 86", "city": "Edmonton", "address": "2306 141 st nw", "phone": "780 119 9766", "username": "tuser86", "id": 86.0, "email": "email86@test.com", "name": "Test User 86" }, { "role": "Role 87", "city": "Edmonton", "address": "2307 142 st nw", "phone": "780 279 2473", "username": "tuser87", "id": 87.0, "email": "email87@test.com", "name": "Test User 87" }, { "role": "Role 88", "city": "Edmonton", "address": "2308 143 st nw", "phone": "780 988 4380", "username": "tuser88", "id": 88.0, "email": "email88@test.com", "name": "Test User 88" }, { "role": "Role 89", "city": "Edmonton", "address": "2309 144 st nw", "phone": "780 707 1633", "username": "tuser89", "id": 89.0, "email": "email89@test.com", "name": "Test User 89" }, { "role": "Role 90", "city": "Edmonton", "address": "2310 145 st nw", "phone": "780 865 2268", "username": "tuser90", "id": 90.0, "email": "email90@test.com", "name": "Test User 90" }, { "role": "Role 91", "city": "Edmonton", "address": "2311 146 st nw", "phone": "780 582 1038", "username": "tuser91", "id": 91.0, "email": "email91@test.com", "name": "Test User 91" }, { "role": "Role 92", "city": "Edmonton", "address": "2312 147 st nw", "phone": "780 278 4555", "username": "tuser92", "id": 92.0, "email": "email92@test.com", "name": "Test User 92" }, { "role": "Role 93", "city": "Edmonton", "address": "2313 148 st nw", "phone": "780 616 8954", "username": "tuser93", "id": 93.0, "email": "email93@test.com", "name": "Test User 93" }, { "role": "Role 94", "city": "Edmonton", "address": "2314 149 st nw", "phone": "780 102 5578", "username": "tuser94", "id": 94.0, "email": "email94@test.com", "name": "Test User 94" }, { "role": "Role 95", "city": "Edmonton", "address": "2315 150 st nw", "phone": "780 924 5297", "username": "tuser95", "id": 95.0, "email": "email95@test.com", "name": "Test User 95" }, { "role": "Role 96", "city": "Edmonton", "address": "2316 151 st nw", "phone": "780 108 6737", "username": "tuser96", "id": 96.0, "email": "email96@test.com", "name": "Test User 96" }, { "role": "Role 97", "city": "Edmonton", "address": "2317 152 st nw", "phone": "780 676 6042", "username": "tuser97", "id": 97.0, "email": "email97@test.com", "name": "Test User 97" }, { "role": "Role 98", "city": "Edmonton", "address": "2318 153 st nw", "phone": "780 571 4497", "username": "tuser98", "id": 98.0, "email": "email98@test.com", "name": "Test User 98" }, { "role": "Role 99", "city": "Edmonton", "address": "2319 154 st nw", "phone": "780 114 6239", "username": "tuser99", "id": 99.0, "email": "email99@test.com", "name": "Test User 99" }, { "role": "Role 100", "city": "Edmonton", "address": "2320 155 st nw", "phone": "780 157 8901", "username": "tuser100", "id": 100.0, "email": "email100@test.com", "name": "Test User 100" }],
            user: this.emptyUser,
            userDialog: false,
            deleteUserDialog: false,
            deleteUsersDialog: false,
            submitted: false,
            selectedUsers: null,
            globalFilter: null
        };

        this.saveUser = this.saveUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.confirmDeleteUser = this.confirmDeleteUser.bind(this);
        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        //this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDeleteUserDialog = this.hideDeleteUserDialog.bind(this);
        this.hideDeleteUsersDialog = this.hideDeleteUsersDialog.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.importCSV = this.importCSV.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedUsers = this.deleteSelectedUsers.bind(this);
    }


    retrieveUsers() {
        DataService.getAllUsers()
            .then(response => {
                this.setState({
                    users: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onInputChange(e, id) {
        const val = (e.target && e.target.value) || '';
        let user = { ...this.state.user };
        user[`${id}`] = val;

        this.setState({ user });
    }

    //   onInputNumberChange(e, name) {
    //     const val = e.value || 0;
    //     let user = { ...this.state.user };
    //     user[`${name}`] = val;

    //     this.setState({ user });
    //   }

    openNew() {
        this.setState({
            user: this.emptyUser,
            submitted: false,
            userDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            userDialog: false
        });
    }

    hideDeleteUserDialog() {
        this.setState({ deleteUserDialog: false });
    }
    hideDeleteUsersDialog() {
        this.setState({ deleteUsersDialog: false });
    }

    saveUser() {
        debugger;
        let state = { submitted: true };

        if (this.state.user.name.trim()) {
            let users = [...this.state.users];
            let user = { ...this.state.user };
            if (this.state.user.id) {
                const index = this.findIndexById(this.state.user.id);

                users[index] = user;
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            }
            else {
                user.id = this.createId(users.length);
                var id = user.id.toString();
                user.username = 'tuser' + id;
                users.push(user);
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            }

            state = {
                ...state,
                users,
                userDialog: false,
                user: this.emptyUser
            };
        }

        this.setState(state);
    }

    editUser(user) {
        this.setState({
            user: { ...user },
            userDialog: true
        });
    }
    confirmDeleteUser(user) {
        this.setState({
            user,
            deleteUserDialog: true
        });
    }

    deleteUser() {
      debugger;
        let users = this.state.users.filter(val => val.id !== this.state.user.id);
        this.setState({
            users,
            deleteUserDialog: false,
            user: this.emptyUser
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(id) {
        id = id + 1;
        // let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // for (let i = 0; i < 5; i++) {
        //   id += chars.charAt(Math.floor(Math.random() * chars.length));
        // }
        return id;
    }

    importCSV(e) {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            //const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();

            const importedData = data.map(d => {
                d = d.split(',');
                return d;
            });

            const users = [...this.state.users, ...importedData];

            this.setState({ users });
        };

        reader.readAsText(file, 'UTF-8');
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    confirmDeleteSelected() {
        this.setState({ deleteUsersDialog: true });
    }


    deleteSelectedUsers() {
      debugger;
        let users = this.state.users.filter(val => !this.state.selectedUsers.includes(val));
        this.setState({
            users,
            deleteUsersDialog: false,
            selectedUsers: null
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedUsers || !this.state.selectedUsers.length} />
            </React.Fragment>
        )
    }

    rightToolbarTemplate() {
        return (
            <React.Fragment>
                <FileUpload mode="basic" name="demo[]" auto url="#" accept=".csv" chooseLabel="Import" className="p-mr-2 p-d-inline-block" onUpload={this.importCSV} />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
            </React.Fragment>
        )
    }

    actionBodyTemplate(rowData) {
        return (
            <DropdownButton id="dropdown-basic-button" title="Action">
                <Dropdown.Item>
                  <Link to={"/courseList/" + rowData.id}>
                      View Course
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={() => this.editUser(rowData)}>Edit</Dropdown.Item>
                <Dropdown.Item href="#" onClick={() => this.confirmDeleteUser(rowData)} >Delete</Dropdown.Item>
            </DropdownButton>
        );
    }



    render() {
        const header = (
            <div className="table-header">
                <h5 className="p-mx-0 p-my-1">User List</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        const userDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveUser} />
            </React.Fragment>
        );
        const deleteUserDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteUserDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteUser} />
            </React.Fragment>
        );

        const deleteUsersDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteUsersDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedUsers} />
            </React.Fragment>
        );

        return (
            <div className="datatable-crud-demo">
                <h2 className="d-flex justify-content-center">User Management</h2>
                <div className="row"></div>
                <Toast ref={(el) => this.toast = el} />

                {/* <div className="card"> */}
                {/* <DataTable value={this.state.users} header="Scroll" responsiveLayout="stack"> */}
                {/* <DataTable value={this.state.users} responsiveLayout="scroll">
                    <Column field="classid" header="Class Id" />
                    <Column field="classcode" header="Class Code" />
                    <Column field="classname" header="Class Name" />
                    <Column field="certificate" header="Certificate" />
                    <Column field="passmarks" header="Pass Marks" />
                    <Column field="marks" header="Marks" />
                </DataTable>
                </div> */}


                <div className="card">
                    <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.users} selection={this.state.selectedUsers} onSelectionChange={(e) => this.setState({ selectedUsers: e.value })}
                        dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                        globalFilter={this.state.globalFilter} header={header} responsiveLayout="stack">
                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="id" header="ID" sortable></Column>
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="username" header="Username" sortable></Column>
                        <Column field="role" header="Role" sortable></Column>
                        <Column field="email" header="Email" sortable></Column>
                        <Column field="phone" header="Phone" sortable></Column>
                        <Column field="city" header="City" sortable ></Column>
                        <Column field="address" header="Address" sortable></Column>
                        <Column body={this.actionBodyTemplate} header="Action" exportable={false}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.userDialog} style={{ width: '450px' }} header="User Details" modal className="p-fluid" footer={userDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="id">ID</label>
                        <InputText id="id" value={this.state.user.id} onChange={(e) => this.onInputChange(e, 'id')} placeholder="auto generated" readOnly={true} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText id="name" value={this.state.user.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.name })} />
                        {this.state.submitted && !this.state.user.name && <small className="p-error"> Name is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="username">Username</label>
                        <InputText id="username" value={this.state.user.username} onChange={(e) => this.onInputChange(e, 'username')} placeholder="auto generated" readOnly={true} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="role">Role</label>
                        <InputText id="role" value={this.state.user.role} onChange={(e) => this.onInputChange(e, 'role')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.role })} />
                        {this.state.submitted && !this.state.user.role && <small className="p-error">Role is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value={this.state.user.email} onChange={(e) => this.onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.email })} />
                        {this.state.submitted && !this.state.user.email && <small className="p-error">Email is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="phone">Phone</label>
                        <InputText id="phone" value={this.state.user.phone} onChange={(e) => this.onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.phone })} />
                        {this.state.submitted && !this.state.user.phone && <small className="p-error">Phone is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="city">City</label>
                        <InputText id="city" value={this.state.user.city} onChange={(e) => this.onInputChange(e, 'city')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.city })} />
                        {this.state.submitted && !this.state.user.city && <small className="p-error">City is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="address">Address</label>
                        <InputText id="address" value={this.state.user.address} onChange={(e) => this.onInputChange(e, 'address')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.address })} />
                        {this.state.submitted && !this.state.user.address && <small className="p-error">Address is required.</small>}
                    </div>

                </Dialog>

                <Dialog visible={this.state.deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={this.hideDeleteUserDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.user && <span>Are you sure you want to delete <b>{this.state.user.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={this.hideDeleteUserDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.user && <span>Are you sure you want to delete the selected users?</span>}
                    </div>
                </Dialog>

            </div>
        );
    }

}
