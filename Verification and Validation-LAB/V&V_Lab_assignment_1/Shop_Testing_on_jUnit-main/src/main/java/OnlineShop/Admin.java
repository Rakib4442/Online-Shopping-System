package OnlineShop;

import java.util.ArrayList;

public class Admin{

    static int admin = 1;
    public ArrayList<Products> productItems = new ArrayList<Products>();
    private int Id;
    private String Name;

    public Admin(String name) {
        Id = admin;
        Name = name;
        admin++;
    }

    public void AddProducts(String name, String group, int price){
        Products products = new Products(name, group, price);
        productItems.add(products);
    }

    public void DeleteProducts(int id){
        productItems.remove(id);
    }

    public void ModifyProducts(int id, String name, String group, int price){
        Products product = productItems.get(id);
        product.setName(name);
        product.setGroup(group);
        product.setPrice(price);
    }
    public ArrayList<Products> ViewProducts(){
        for (Products product : productItems) {
            System.out.println(product.Name);
        }
        return productItems;
    }



}
