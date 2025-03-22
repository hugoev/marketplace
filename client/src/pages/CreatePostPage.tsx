import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CustomSelect } from '@/components/ui/custom-select'
import { ImagePlus, X, Loader2 } from 'lucide-react'
import { apiService } from '@/lib/api'
import { Category } from '@/types'
import { toast } from 'sonner'

interface FormData {
  title: string;
  description: string;
  price: string;
  categoryId: string;
  location: string;
  condition: string;
}

export default function CreatePostPage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [images, setImages] = useState<File[]>([])
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    location: '',
    condition: ''
  })

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const response = await apiService.getCategories()
      setCategories(response.data)
    } catch (err) {
      console.error('Failed to load categories:', err)
      toast('Failed to load categories')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 8) {
      toast('Maximum 8 images allowed')
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData(event.currentTarget)
      await apiService.createListing(formDataToSend)
      
      toast('Listing created successfully')

      // Redirect after successful creation
      setTimeout(() => {
        navigate('/marketplace')
      }, 1500)
    } catch (err) {
      console.error('Failed to create listing:', err)
      toast('Failed to create listing')
    } finally {
      setLoading(false)
    }
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
                <Input
                  name="title"
                  placeholder="Enter a descriptive title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea 
                  name="description"
                  placeholder="Describe your item in detail" 
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <CustomSelect
                  value={formData.categoryId}
                  onChange={(value: string) => {
                    setFormData(prev => ({ ...prev, categoryId: value }))
                  }}
                  options={categories.map(cat => ({
                    value: cat.id.toString(),
                    label: cat.name
                  }))}
                  placeholder="Select category"
                />
                <input type="hidden" name="categoryId" value={formData.categoryId} required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Condition</label>
                <CustomSelect
                  value={formData.condition}
                  onChange={(value: string) => {
                    setFormData(prev => ({ ...prev, condition: value }))
                  }}
                  options={[
                    { value: 'NEW', label: 'New' },
                    { value: 'LIKE_NEW', label: 'Like New' },
                    { value: 'GOOD', label: 'Good' },
                    { value: 'FAIR', label: 'Fair' }
                  ]}
                  placeholder="Select condition"
                />
                <input type="hidden" name="condition" value={formData.condition} required />
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
                    name="price"
                    type="number" 
                    min="0" 
                    step="0.01" 
                    className="pl-7" 
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  name="location"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" disabled={loading || images.length === 0}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish Listing
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}