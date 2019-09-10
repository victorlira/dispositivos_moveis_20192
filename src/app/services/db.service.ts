import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable()
export class DBService {

    constructor(public db: AngularFireDatabase) { }

    listAndWatch<Type>(entity: string): Observable<Type[]> {
        return this.db.list<Type>(`/${entity}`).valueChanges();
    }

    list<Type>(entity: string): Promise<Type[]> {
        return new Promise<Type[]>((resolve, reject) => {
            this.db.list<Type>(`/${entity}`)
                .valueChanges()
                .subscribe(
                    result => resolve(result),
                    error => reject(error)
                );
        });
    }

    search<Type>(entity: string, filterProperty: string, filterValue: any): Promise<Type[]> {
        return new Promise<Type[]>((resolve, reject) => {
            this.db.list<Type>(`/${entity}`, ref => ref.orderByChild(filterProperty).equalTo(filterValue))
                .snapshotChanges()
                .subscribe(
                    items => {
                        const typedItems: Type[] = [];

                        items.forEach(item => {
                            const typedItem: Type = item.payload.val();
                            typedItem['uid'] = item.key;
                            typedItems.push(typedItem);
                        });

                        resolve(typedItems);
                    },
                    error => reject(error)
                );
        });
    }

    listByKey<Type>(entity: string, uid: string): Promise<Type[]> {
        return this.list<Type>(`/${entity}/${uid}`);
    }

    listWithUIDs<Type>(entity: string): Promise<Type[]> {
        return new Promise<Type[]>((resolve, reject) => {
            this.db.list<Type>(`/${entity}`)
                .snapshotChanges()
                .subscribe(
                    items => {
                        const typedItems: Type[] = [];

                        items.forEach(item => {
                            const typedItem: Type = item.payload.val();
                            typedItem['uid'] = item.key;
                            typedItems.push(typedItem);
                        });

                        resolve(typedItems);
                    },
                    error => reject(error)
                );
        });
    }

    getObject<Type>(entity: string): Promise<Type> {
        return new Promise<Type>((resolve, reject) => {
            this.db.object<Type>(`/${entity}`)
                .valueChanges()
                .subscribe(
                    result => resolve(result),
                    error => reject(error)
                );
        });
    }

    getObjectByKey<Type>(entity: string, uid: string): Promise<Type> {
        return new Promise<Type>((resolve, reject) => {
            this.getObject<Type>(`/${entity}/${uid}`)
                .then(object => {
                    if (object) {
                        object['uid'] = uid;
                    }
                    resolve(object);
                }).catch(error => reject(error));
        });
    }

    getObjectAndWatch<Type>(entity: string): Observable<Type> {
        return this.db.object<Type>(`/${entity}`).valueChanges();
    }

    insert<Type>(entity: string, object: Type): Promise<void> {
        return this.db.object<Type>(`/${entity}`)
            .set(object);
    }

    insertInList<Type>(entity: string, object: Type): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.db.list<Type>(`/${entity}`)
                .push(object)
                .then(item => resolve(item.key));
        });
    }

    update(entity: string, uid: string, object): Promise<void> {
        return this.db.object(`/${entity}/${uid}`).update(object);
    }

    updateList(entity: string, uid: string, object): Promise<void> {
        return this.db.object(`/${entity}/${uid}`).set(object);
    }

    remove(entity: string, uid: string): Promise<void> {
        return this.db.object(`/${entity}/${uid}`).remove();
    }
}