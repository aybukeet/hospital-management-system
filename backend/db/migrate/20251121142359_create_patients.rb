class CreatePatients < ActiveRecord::Migration[8.1]
  def change
    create_table :patients do |t|
      t.string :name
      t.integer :age
      t.string :phone

      t.timestamps
    end
  end
end
