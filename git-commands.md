Here’s a clean, well-organized document you can save in your repo (e.g., `git-commands.mdx`).
It includes:

* creating a new branch
* switching branches
* merging a branch into `main`
* pushing changes

---

````mdx
# Git Commands Cheat Sheet

A simple guide for common Git operations used when working with branches and pushing changes to `main`.

---

## 📌 Create a New Branch

Use this when you want to work on a new feature or section without affecting the `main` branch.

```bash
# Create a new branch
git checkout -b branch-name
````

Example:

```bash
git checkout -b blog
```

---

## 🔄 Switch Between Branches

```bash
git checkout branch-name
```

Example:

```bash
git checkout main
```

---

## 📝 Add & Commit Changes

```bash
# Add all changed files
git add .

# Commit your work
git commit -m "your commit message"
```

---

## 🚀 Push a Branch to GitHub

```bash
git push origin branch-name
```

Example:

```bash
git push origin blog
```

---

## 🔗 Merge a Branch Into Main (Locally)

1. Switch to `main`
2. Pull latest changes
3. Merge your branch
4. Push to GitHub

```bash
git checkout main
git pull origin main
git merge branch-name
git push origin main
```

Example:

```bash
git checkout main
git pull origin main
git merge blog
git push origin main
```

---

## ✨ Delete a Branch (Optional)

After merging, if you want to clean up:

```bash
# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

---

## 📦 View All Branches

```bash
git branch
# or
git branch -a
```

---

## 🔍 Check Status

```bash
git status
```

---

Use this MDX file whenever you forget Git commands during workflow.
If you'd like, I can also create a version with tables or a more visual layout!
