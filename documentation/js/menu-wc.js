'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">shop-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CustomersModule.html" data-type="entity-link" >CustomersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CustomersModule-0d6e9dcc3d56020b4c8c15bb7bf46e1ed583971d7b082aa3d493790f3735d2db282bf1c106c3d035cf9e76335f2b151a838285edafaf0b0f48b2dadf62897737"' : 'data-bs-target="#xs-controllers-links-module-CustomersModule-0d6e9dcc3d56020b4c8c15bb7bf46e1ed583971d7b082aa3d493790f3735d2db282bf1c106c3d035cf9e76335f2b151a838285edafaf0b0f48b2dadf62897737"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CustomersModule-0d6e9dcc3d56020b4c8c15bb7bf46e1ed583971d7b082aa3d493790f3735d2db282bf1c106c3d035cf9e76335f2b151a838285edafaf0b0f48b2dadf62897737"' :
                                            'id="xs-controllers-links-module-CustomersModule-0d6e9dcc3d56020b4c8c15bb7bf46e1ed583971d7b082aa3d493790f3735d2db282bf1c106c3d035cf9e76335f2b151a838285edafaf0b0f48b2dadf62897737"' }>
                                            <li class="link">
                                                <a href="controllers/CustomersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CustomersModule-0d6e9dcc3d56020b4c8c15bb7bf46e1ed583971d7b082aa3d493790f3735d2db282bf1c106c3d035cf9e76335f2b151a838285edafaf0b0f48b2dadf62897737"' : 'data-bs-target="#xs-injectables-links-module-CustomersModule-0d6e9dcc3d56020b4c8c15bb7bf46e1ed583971d7b082aa3d493790f3735d2db282bf1c106c3d035cf9e76335f2b151a838285edafaf0b0f48b2dadf62897737"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CustomersModule-0d6e9dcc3d56020b4c8c15bb7bf46e1ed583971d7b082aa3d493790f3735d2db282bf1c106c3d035cf9e76335f2b151a838285edafaf0b0f48b2dadf62897737"' :
                                        'id="xs-injectables-links-module-CustomersModule-0d6e9dcc3d56020b4c8c15bb7bf46e1ed583971d7b082aa3d493790f3735d2db282bf1c106c3d035cf9e76335f2b151a838285edafaf0b0f48b2dadf62897737"' }>
                                        <li class="link">
                                            <a href="injectables/CustomersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeliveriesModule.html" data-type="entity-link" >DeliveriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DeliveriesModule-f37ce7900fbaf7f35d2ab013e8888ef8cc74cde91a3e6af10c5bb855b0371fea2c043c2bb26991ba6ec3add1f341851e11d98cf4c7291650ca15ad86fc453347"' : 'data-bs-target="#xs-controllers-links-module-DeliveriesModule-f37ce7900fbaf7f35d2ab013e8888ef8cc74cde91a3e6af10c5bb855b0371fea2c043c2bb26991ba6ec3add1f341851e11d98cf4c7291650ca15ad86fc453347"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DeliveriesModule-f37ce7900fbaf7f35d2ab013e8888ef8cc74cde91a3e6af10c5bb855b0371fea2c043c2bb26991ba6ec3add1f341851e11d98cf4c7291650ca15ad86fc453347"' :
                                            'id="xs-controllers-links-module-DeliveriesModule-f37ce7900fbaf7f35d2ab013e8888ef8cc74cde91a3e6af10c5bb855b0371fea2c043c2bb26991ba6ec3add1f341851e11d98cf4c7291650ca15ad86fc453347"' }>
                                            <li class="link">
                                                <a href="controllers/DeliveriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DeliveriesModule-f37ce7900fbaf7f35d2ab013e8888ef8cc74cde91a3e6af10c5bb855b0371fea2c043c2bb26991ba6ec3add1f341851e11d98cf4c7291650ca15ad86fc453347"' : 'data-bs-target="#xs-injectables-links-module-DeliveriesModule-f37ce7900fbaf7f35d2ab013e8888ef8cc74cde91a3e6af10c5bb855b0371fea2c043c2bb26991ba6ec3add1f341851e11d98cf4c7291650ca15ad86fc453347"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DeliveriesModule-f37ce7900fbaf7f35d2ab013e8888ef8cc74cde91a3e6af10c5bb855b0371fea2c043c2bb26991ba6ec3add1f341851e11d98cf4c7291650ca15ad86fc453347"' :
                                        'id="xs-injectables-links-module-DeliveriesModule-f37ce7900fbaf7f35d2ab013e8888ef8cc74cde91a3e6af10c5bb855b0371fea2c043c2bb26991ba6ec3add1f341851e11d98cf4c7291650ca15ad86fc453347"' }>
                                        <li class="link">
                                            <a href="injectables/DeliveriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentsModule.html" data-type="entity-link" >PaymentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymentsModule-66a9230b19ba1f5dc84cc9ab8a50fdcabf25a90610f07b3009383586d5c25b1a9b7daecbff082347e43950e1006fce97f879a39328710e4ac010103380ea15b7"' : 'data-bs-target="#xs-controllers-links-module-PaymentsModule-66a9230b19ba1f5dc84cc9ab8a50fdcabf25a90610f07b3009383586d5c25b1a9b7daecbff082347e43950e1006fce97f879a39328710e4ac010103380ea15b7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentsModule-66a9230b19ba1f5dc84cc9ab8a50fdcabf25a90610f07b3009383586d5c25b1a9b7daecbff082347e43950e1006fce97f879a39328710e4ac010103380ea15b7"' :
                                            'id="xs-controllers-links-module-PaymentsModule-66a9230b19ba1f5dc84cc9ab8a50fdcabf25a90610f07b3009383586d5c25b1a9b7daecbff082347e43950e1006fce97f879a39328710e4ac010103380ea15b7"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentsModule-66a9230b19ba1f5dc84cc9ab8a50fdcabf25a90610f07b3009383586d5c25b1a9b7daecbff082347e43950e1006fce97f879a39328710e4ac010103380ea15b7"' : 'data-bs-target="#xs-injectables-links-module-PaymentsModule-66a9230b19ba1f5dc84cc9ab8a50fdcabf25a90610f07b3009383586d5c25b1a9b7daecbff082347e43950e1006fce97f879a39328710e4ac010103380ea15b7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentsModule-66a9230b19ba1f5dc84cc9ab8a50fdcabf25a90610f07b3009383586d5c25b1a9b7daecbff082347e43950e1006fce97f879a39328710e4ac010103380ea15b7"' :
                                        'id="xs-injectables-links-module-PaymentsModule-66a9230b19ba1f5dc84cc9ab8a50fdcabf25a90610f07b3009383586d5c25b1a9b7daecbff082347e43950e1006fce97f879a39328710e4ac010103380ea15b7"' }>
                                        <li class="link">
                                            <a href="injectables/CustomersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaymentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TransactionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-7916d508b089ec4bbe1b95c4632270641a1ad0913cc35cb12bc94715674d9905afe4e179bf08d3012485ecc46c7ad421ba933f0991eedd74ebf7517fb2ddfc54"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-7916d508b089ec4bbe1b95c4632270641a1ad0913cc35cb12bc94715674d9905afe4e179bf08d3012485ecc46c7ad421ba933f0991eedd74ebf7517fb2ddfc54"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-7916d508b089ec4bbe1b95c4632270641a1ad0913cc35cb12bc94715674d9905afe4e179bf08d3012485ecc46c7ad421ba933f0991eedd74ebf7517fb2ddfc54"' :
                                            'id="xs-controllers-links-module-ProductsModule-7916d508b089ec4bbe1b95c4632270641a1ad0913cc35cb12bc94715674d9905afe4e179bf08d3012485ecc46c7ad421ba933f0991eedd74ebf7517fb2ddfc54"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-7916d508b089ec4bbe1b95c4632270641a1ad0913cc35cb12bc94715674d9905afe4e179bf08d3012485ecc46c7ad421ba933f0991eedd74ebf7517fb2ddfc54"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-7916d508b089ec4bbe1b95c4632270641a1ad0913cc35cb12bc94715674d9905afe4e179bf08d3012485ecc46c7ad421ba933f0991eedd74ebf7517fb2ddfc54"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-7916d508b089ec4bbe1b95c4632270641a1ad0913cc35cb12bc94715674d9905afe4e179bf08d3012485ecc46c7ad421ba933f0991eedd74ebf7517fb2ddfc54"' :
                                        'id="xs-injectables-links-module-ProductsModule-7916d508b089ec4bbe1b95c4632270641a1ad0913cc35cb12bc94715674d9905afe4e179bf08d3012485ecc46c7ad421ba933f0991eedd74ebf7517fb2ddfc54"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionsModule.html" data-type="entity-link" >TransactionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TransactionsModule-82aedc096d9fc7c2982dd7f8baa83956d68dfcc96f456a964b4ae6d2faaf412fdc9e23cc48d57d51bb65ab1570b1147dbfd43bd2b7a502b9a831de1d49e413b5"' : 'data-bs-target="#xs-controllers-links-module-TransactionsModule-82aedc096d9fc7c2982dd7f8baa83956d68dfcc96f456a964b4ae6d2faaf412fdc9e23cc48d57d51bb65ab1570b1147dbfd43bd2b7a502b9a831de1d49e413b5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TransactionsModule-82aedc096d9fc7c2982dd7f8baa83956d68dfcc96f456a964b4ae6d2faaf412fdc9e23cc48d57d51bb65ab1570b1147dbfd43bd2b7a502b9a831de1d49e413b5"' :
                                            'id="xs-controllers-links-module-TransactionsModule-82aedc096d9fc7c2982dd7f8baa83956d68dfcc96f456a964b4ae6d2faaf412fdc9e23cc48d57d51bb65ab1570b1147dbfd43bd2b7a502b9a831de1d49e413b5"' }>
                                            <li class="link">
                                                <a href="controllers/TransactionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TransactionsModule-82aedc096d9fc7c2982dd7f8baa83956d68dfcc96f456a964b4ae6d2faaf412fdc9e23cc48d57d51bb65ab1570b1147dbfd43bd2b7a502b9a831de1d49e413b5"' : 'data-bs-target="#xs-injectables-links-module-TransactionsModule-82aedc096d9fc7c2982dd7f8baa83956d68dfcc96f456a964b4ae6d2faaf412fdc9e23cc48d57d51bb65ab1570b1147dbfd43bd2b7a502b9a831de1d49e413b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TransactionsModule-82aedc096d9fc7c2982dd7f8baa83956d68dfcc96f456a964b4ae6d2faaf412fdc9e23cc48d57d51bb65ab1570b1147dbfd43bd2b7a502b9a831de1d49e413b5"' :
                                        'id="xs-injectables-links-module-TransactionsModule-82aedc096d9fc7c2982dd7f8baa83956d68dfcc96f456a964b4ae6d2faaf412fdc9e23cc48d57d51bb65ab1570b1147dbfd43bd2b7a502b9a831de1d49e413b5"' }>
                                        <li class="link">
                                            <a href="injectables/TransactionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/CustomersController.html" data-type="entity-link" >CustomersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DeliveriesController.html" data-type="entity-link" >DeliveriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PaymentsController.html" data-type="entity-link" >PaymentsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TransactionsController.html" data-type="entity-link" >TransactionsController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Customer.html" data-type="entity-link" >Customer</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Delivery.html" data-type="entity-link" >Delivery</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Transaction.html" data-type="entity-link" >Transaction</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateCustomerDto.html" data-type="entity-link" >CreateCustomerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDeliveryDto.html" data-type="entity-link" >CreateDeliveryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentDto.html" data-type="entity-link" >CreatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTransactionDto.html" data-type="entity-link" >CreateTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Payment.html" data-type="entity-link" >Payment</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCustomerDto.html" data-type="entity-link" >UpdateCustomerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDeliveryDto.html" data-type="entity-link" >UpdateDeliveryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePaymentDto.html" data-type="entity-link" >UpdatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTransactionDto.html" data-type="entity-link" >UpdateTransactionDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CustomersService.html" data-type="entity-link" >CustomersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeliveriesService.html" data-type="entity-link" >DeliveriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentsService.html" data-type="entity-link" >PaymentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionsService.html" data-type="entity-link" >TransactionsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Aceptation.html" data-type="entity-link" >Aceptation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-1.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-2.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-3.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Extra.html" data-type="entity-link" >Extra</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentMethod.html" data-type="entity-link" >PaymentMethod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentMethod-1.html" data-type="entity-link" >PaymentMethod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentProcessor.html" data-type="entity-link" >PaymentProcessor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentSources.html" data-type="entity-link" >PaymentSources</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Presigned.html" data-type="entity-link" >Presigned</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PublicData.html" data-type="entity-link" >PublicData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenCard.html" data-type="entity-link" >TokenCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WompiTransaction.html" data-type="entity-link" >WompiTransaction</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});