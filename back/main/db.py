from google.cloud import datastore

datastore_client = datastore.Client()

kind = "menu"
name = "oyakodon"
menu_key = datastore_client.key(kind, name)

menu = datastore.Entity(key=menu_key)
menu["ingredients"] = ["egg", "chicken", "onion",]
menu["price"] = "300yen"

datastore_client.put(menu)

print(f"Saved {menu.key.name}: {menu['ingredients']}")
print(f"Saved {menu.key.name}: {menu['price']}")