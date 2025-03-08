import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const categoriesRef = collection(db, "categories");
  
    // Fetch Categories from Firestore
    useEffect(() => {
      fetchCategories();
    }, []);
  
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(categoriesRef);
        const categoryList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      }
      setLoading(false);
    };
  
    // Add or Update a Category
    const addOrUpdateCategory = async (name, subcategories = [], editId = null) => {
      if (!name.trim()) return;
  
      try {
        const categoryData = { name, subcategories };
  
        if (editId) {
          const categoryRef = doc(db, "categories", editId);
          await updateDoc(categoryRef, categoryData);
        } else {
          await addDoc(categoriesRef, categoryData);
        }
  
        fetchCategories(); // Refresh the list
      } catch (error) {
        console.error("Error saving category:", error);
        setError(error.message);
      }
    };

    const editCategoryName = async (categoryId, newName) => {
        try {
          const categoryRef = doc(db, "categories", categoryId);
          await updateDoc(categoryRef, { name: newName });
          fetchCategories();
        } catch (error) {
          console.error("Error editing category name:", error);
          setError(error.message);
        }
      };
  
    // Add a Subcategory
    const addSubcategory = async (categoryId, subcategory) => {
      try {
        const categoryRef = doc(db, "categories", categoryId);
        const category = categories.find((c) => c.id === categoryId);
  
        if (!category) return;
  
        const updatedSubcategories = [...category.subcategories, subcategory];
  
        await updateDoc(categoryRef, { subcategories: updatedSubcategories });
  
        fetchCategories();
      } catch (error) {
        console.error("Error adding subcategory:", error);
        setError(error.message);
      }
    };
  
    // Edit a Subcategory
    const editSubcategory = async (categoryId, oldSubcategory, newSubcategory) => {
      try {
        const categoryRef = doc(db, "categories", categoryId);
        const category = categories.find((c) => c.id === categoryId);
  
        if (!category) return;
  
        const updatedSubcategories = category.subcategories.map((sub) =>
          sub === oldSubcategory ? newSubcategory : sub
        );
  
        await updateDoc(categoryRef, { subcategories: updatedSubcategories });
  
        fetchCategories();
      } catch (error) {
        console.error("Error editing subcategory:", error);
        setError(error.message);
      }
    };
  
    // Delete a Category
    const deleteCategory = async (id) => {
      try {
        await deleteDoc(doc(db, "categories", id));
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        setError(error.message);
      }
    };
  
    // Delete a Subcategory
    const deleteSubcategory = async (categoryId, subcategory) => {
      try {
        const categoryRef = doc(db, "categories", categoryId);
        const category = categories.find((c) => c.id === categoryId);
  
        if (!category) return;
  
        const updatedSubcategories = category.subcategories.filter((sub) => sub !== subcategory);
  
        await updateDoc(categoryRef, { subcategories: updatedSubcategories });
  
        fetchCategories();
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        setError(error.message);
      }
    };
  
    return {
      categories,
      loading,
      error,
      addOrUpdateCategory,
      editCategoryName,
      addSubcategory,
      editSubcategory,
      deleteCategory,
      deleteSubcategory,
    };
  }
  