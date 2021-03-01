# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Admin.create(
    username: 'mattk', 
    password_digest: '123456'
)
Member.create(
    email: 'mattkuras@gmail.com', 
    password_digest: '123456',
    first_name: 'matt',
    last_name: 'kuras',
    reference: 'mattkuras@gmail.com'
)
