import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CustomSelect } from '@/components/ui/custom-select'
import { ImagePlus, X, Loader2 } from 'lucide-react'
import { categories } from '@/lib/mock-data'

export default function CreatePostPage() {
  const [images, setImages] = useState<File[]>([])
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 8) {
      alert('Maximum 8 images allowed')
      return
    }

    setImages(prev => [...prev, ...files])
    
    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file))
    setImagesPreviews(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    URL.revokeObjectURL(imagesPreviews[index]) // Clean up preview URL
    setImagesPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    // Handle successful submission (e.g., redirect to listing page)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Listing</h1>
          <p className="text-gray-600 mt-2">Fill in the details below to create your listing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images Upload */}
          <Card>
            <CardContent className="p-6">
              <label className="block text-sm font-medium mb-4">
                Images (Max 8)
                <span className="text-gray-500 font-normal ml-2">First image will be the cover</span>
              </label>
              
              <div className="grid grid-cols-4 gap-4">
                {imagesPreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70 text-white"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 text-xs bg-black/50 text-white px-2 py-1 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
                
                {images.length < 8 && (
                  <div className="aspect-square relative">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="h-full border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-gray-300">
                      <ImagePlus className="h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-500">Add Images</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input placeholder="Enter a descriptive title" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea 
                  placeholder="Describe your item in detail" 
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <CustomSelect required>
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </CustomSelect>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Condition</label>
                <CustomSelect required>
                  <option value="">Select condition</option>
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </CustomSelect>
              </div>
            </CardContent>
          </Card>

          {/* Price & Location */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    className="pl-7" 
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input placeholder="Enter your location" required />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" disabled={isSubmitting || images.length === 0}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish Listing
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}