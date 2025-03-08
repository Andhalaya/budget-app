import { useState } from "react";
import * as Icons from "../../assets/Icons";
import { useCategories } from "../../hooks/useCategories";

export default function Categories() {
  const {
    categories,
    loading,
    addOrUpdateCategory,
    editCategoryName,
    addSubcategory,
    editSubcategory,
    deleteCategory,
  } = useCategories();

  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Handle Category Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateCategory(name, [], editId);
    setName("");
    setEditId(null);
  };

  // Handle Adding a Subcategory
  const handleAddSubcategory = (e) => {
    e.preventDefault();
    if (selectedCategoryId && subcategoryName.trim()) {
      addSubcategory(selectedCategoryId, subcategoryName);
      setSubcategoryName("");
    }
  };

  // Handle Editing a Category Name
  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setNewCategoryName(category.name);
  };

  // Save Edited Category Name
  const handleSaveCategory = () => {
    if (editingCategory && newCategoryName.trim()) {
      editCategoryName(editingCategory, newCategoryName);
      setEditingCategory(null);
      setNewCategoryName("");
    }
  };

  // Handle Editing a Subcategory
  const handleEditSubcategory = (categoryId, subcategory) => {
    setEditingSubcategory({ categoryId, subcategory });
    setNewSubcategoryName(subcategory);
  };

  // Save Edited Subcategory
  const handleSaveSubcategory = () => {
    if (editingSubcategory && newSubcategoryName.trim()) {
      editSubcategory(editingSubcategory.categoryId, editingSubcategory.subcategory, newSubcategoryName);
      setEditingSubcategory(null);
      setNewSubcategoryName("");
    }
  };

  return (
    <div>
      <h2>Manage Categories & Subcategories</h2>

      {/* Category Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Update Category" : "Add Category"}</button>
        {editId && <button onClick={() => setEditId(null)}>Cancel</button>}
      </form>

       {/* Add Subcategory Form */}
       <form onSubmit={handleAddSubcategory}>
        <select
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          value={selectedCategoryId || ""}
          required
        >
          <option value="" disabled>Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Subcategory Name"
          value={subcategoryName}
          onChange={(e) => setSubcategoryName(e.target.value)}
          required
        />
        <button type="submit">Add Subcategory</button>
      </form>


      {/* Category List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {editingCategory === category.id ? (
                <>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <button onClick={handleSaveCategory}>Save</button>
                </>
              ) : (
                <>
                  <strong>{category.name}</strong>
                  <button onClick={() => handleEditCategory(category)}>Edit</button>
                  <button onClick={() => deleteCategory(category.id)}>Delete</button>
                </>
              )}

              <ul>
                {category.subcategories.map((sub, index) => (
                  <li key={index}>
                    {editingSubcategory?.subcategory === sub ? (
                      <>
                        <input
                          type="text"
                          value={newSubcategoryName}
                          onChange={(e) => setNewSubcategoryName(e.target.value)}
                        />
                        <button onClick={handleSaveSubcategory}>Save</button>
                      </>
                    ) : (
                      <>
                        {sub}
                        <button onClick={() => handleEditSubcategory(category.id, sub)}>Edit</button>
                        <button onClick={() => deleteSubcategory(category.id, sub)}>Delete</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

