import { Category } from "../entities/Category";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class CategoryResolver {
@Query(() => [Category])
categories(
    @Ctx() {em}: MyContext): Promise<Category[]> {
    return em.find(Category, {});
}

@Query(() => Category, { nullable: true})
category(
    @Arg('id') id: number,
    @Ctx() {em}: MyContext): Promise<Category | null> {
    return em.findOne(Category, { id });
}

@Mutation(() => Category)
async createCategory(
    @Arg('title') title: string,
    @Ctx() {em}: MyContext): Promise<Category> {
        const category = em.create(Category, {title});
        await em.persistAndFlush(category);
        return category;
}

@Mutation(() => Category, { nullable: true})
async updateCategory(
    @Arg('id') id: number,
    @Arg('title', () => String, { nullable: true }) title: string,
    @Ctx() {em}: MyContext): Promise<Category | null> {
        const category = await em.findOne(Category, {id});
        if(!category) {
            return null
        }
        if ( typeof title !== 'undefined') {
            category.title = title;
        }
        await em.persistAndFlush(category)
        return category;
}

@Mutation(() => Boolean)
async deleteCategory(
    @Arg('id') id: number,
    @Ctx() {em}: MyContext): Promise<boolean> {
     try {
         await em.nativeDelete(Category, { id });
     } catch {
         return false
     }
     return true
}

}