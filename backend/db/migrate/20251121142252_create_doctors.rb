class CreateDoctors < ActiveRecord::Migration[8.1]
  def change
    create_table :doctors do |t|
      t.string :name
      t.references :department, null: false, foreign_key: true
      t.string :phone

      t.timestamps
    end
  end
end
